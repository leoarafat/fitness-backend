/* eslint-disable @typescript-eslint/ban-ts-comment */
import { startSession } from 'mongoose';
import Paypal from 'paypal-rest-sdk';
import config from '../../../config';
import { IOrder } from './orders.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Order } from './orders.model';
import { Products } from '../products/products.model';
import User from '../user/user.model';
import { generateTransactionId } from '../../../utils/uniqueId';
import QueryBuilder from '../../../builder/QueryBuilder';

const clientId = config.paypal.client_id;
const clientSecret = config.paypal.client_secret;

if (!clientId || !clientSecret) {
  throw new Error('PayPal client_id and client_secret must be defined');
}

Paypal.configure({
  mode: 'sandbox',
  client_id: clientId,
  client_secret: clientSecret,
});

const makeOrder = async (payload: Partial<IOrder>) => {
  const {
    address,
    contactNumber,
    deliveryDate,
    paymentMethod,
    product,
    quantity,
    user,
    payerId,
  } = payload;

  if (
    !address ||
    !contactNumber ||
    !deliveryDate ||
    !paymentMethod ||
    !product ||
    !quantity ||
    !user
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, ` All field er required`);
  }
  const products = await Products.findById(product);
  if (!products) {
    throw new ApiError(404, 'Product not found');
  }
  const users = await User.findById(user);
  if (!users) {
    throw new ApiError(404, 'User not found');
  }
  const totalPrice = Number(products.price) * quantity;

  const session = await startSession();
  session.startTransaction();

  try {
    // Step 1: Create a PayPal payment
    const createPaymentJson = {
      intent: 'sale',
      payer: {
        payment_method: paymentMethod,
      },
      redirect_urls: {
        return_url: 'http://localhost:3000/payment',
        cancel_url: 'http://cancel.url',
      },
      transactions: [
        {
          amount: {
            currency: 'USD',
            total: totalPrice.toFixed(2),
          },
          description: 'This is the payment transaction description.',
        },
      ],
    };

    const payment = await new Promise((resolve, reject) => {
      Paypal.payment.create(createPaymentJson, (error, payment) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(payment);
        }
      });
    });

    // Step 2: Execute the payment after payer approval
    const executePaymentJson = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: 'USD',
            total: totalPrice.toFixed(2),
          },
        },
      ],
    };

    await new Promise((resolve, reject) => {
      Paypal.payment.execute(
        //@ts-ignore
        payment.id,
        //@ts-ignore
        executePaymentJson,
        (error, payment) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(payment);
          }
        },
      );
    });

    // Step 3: Create the order in the database
    const order = new Order({
      ...payload,
      transactionId: generateTransactionId(),
    });

    await order.save({ session });

    // Step 4: Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return order;
  } catch (error) {
    // If any of the steps fail, rollback the transaction
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const getAllOrders = async (query: Record<string, any>) => {
  const ordersQuery = new QueryBuilder(Order.find({}), query)
    .search(['address'])
    .fields()
    .filter()
    .sort()
    .paginate();

  const result = ordersQuery.modelQuery;
  const meta = ordersQuery.countTotal;
  return {
    data: result,
    meta,
  };
};
export const OrderService = {
  makeOrder,
  getAllOrders,
};
