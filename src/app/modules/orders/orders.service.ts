/* eslint-disable @typescript-eslint/ban-ts-comment */

// import Paypal from 'paypal-rest-sdk';
// import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { Order } from './orders.model';
import QueryBuilder from '../../../builder/QueryBuilder';
import { Request } from 'express';
import { IOrder } from './orders.interface';
import { Products } from '../products/products.model';
import User from '../user/user.model';
import { IReqUser } from '../user/user.interface';

// const clientId = config.paypal.client_id;
// const clientSecret = config.paypal.client_secret;

// if (!clientId || !clientSecret) {
//   throw new Error('PayPal client_id and client_secret must be defined');
// }

// Paypal.configure({
//   mode: 'sandbox',
//   client_id: clientId,
//   client_secret: clientSecret,
// });

//!
// const makeOrder = async (payload: Partial<IOrder>) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const newOrder = new Order({
//       user: payload.user,
//       totalAmount: payload.totalAmount,
//       currency: payload.currency,
//       status: 'pending',
//       transactionId: generateTransactionId(),
//       address: payload.address,
//       contactNumber: payload.contactNumber,
//       deliveryDate: payload.deliveryDate,
//       paymentMethod: payload.paymentMethod,
//       product: payload.product,
//       quantity: payload.quantity,
//       payerId: payload.payerId,
//     });

//     const savedOrder = await newOrder.save({ session });

//     const create_payment_json = {
//       intent: 'sale',
//       payer: {
//         payment_method: 'paypal',
//       },
//       redirect_urls: {
//         return_url: 'http://localhost:3000/success',
//         cancel_url: 'http://localhost:3000/cancel',
//       },
//       transactions: [
//         {
//           amount: {
//             currency: 'USD',
//             total: payload.totalAmount,
//           },
//           description: 'Nothing',
//         },
//       ],
//     };

//     const paymentResult = await new Promise((resolve, reject) => {
//       Paypal.payment.create(
//         create_payment_json as any,
//         async (error, payment) => {
//           if (error) {
//             logger.error(error);
//             reject(error);
//           } else {
//             resolve(payment);
//           }
//         },
//       );
//     });
//     //@ts-ignore
//     savedOrder.transactionId = paymentResult.id;
//     await savedOrder.save({ session });

//     await session.commitTransaction();
//     session.endSession();

//     return paymentResult;
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     logger.error('Transaction aborted due to an error: ', error);
//     throw error;
//   }
// };
//!

const makeOrder = async (req: Request) => {
  const payload = req.body as IOrder;
  const { userId } = req.user as IReqUser;

  const isExistUser = await User.findById(userId);
  if (!isExistUser) {
    throw new ApiError(404, 'User not found');
  }
  const isExistProduct = await Products.findById(payload.product);
  if (!isExistProduct) {
    throw new ApiError(404, 'Product not found');
  }
  return await Order.create(payload);
};

const getAllOrders = async (query: Record<string, any>) => {
  const orderQuery = new QueryBuilder(Order.find(), query)
    .search(['address'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();

  return {
    meta,
    data: result,
  };
};
const getSingle = async (id: string) => {
  const isExist = await Order.findById(id);
  if (!isExist) {
    throw new ApiError(404, 'Order not found');
  }
  return isExist;
};
const updateOrder = async (req: Request) => {
  const data = req.body;
  const { id } = req.params;
  const isExist = await Order.findById(id);
  if (!isExist) {
    throw new ApiError(404, 'Order not found');
  }
  const { ...orderData } = data;
  return await Order.findByIdAndUpdate(id, orderData, {
    new: true,
    runValidators: true,
  });
};
export const OrderService = {
  makeOrder,
  getAllOrders,
  getSingle,
  updateOrder,
};
