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
import Notification from '../notifications/notifications.model';

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
  //@ts-ignore
  payload.user = userId;
  const notification = await Notification.create({
    user: isExistUser?._id,
    title: 'New Order Placed',
    message: `New order arrived from ${isExistUser?.name} on ${isExistProduct?.productName} Product.`,
  });
  //@ts-ignore
  global.io.to(isExistUser?.id.toString()).emit('notification', notification);
  return await Order.create(payload);
};

const getAllOrders = async (query: Record<string, unknown>) => {
  const orderQuery = (
    await new QueryBuilder(
      Order.find().populate([
        {
          path: 'user',
          select: 'name email',
        },
        {
          path: 'product',
          select: 'productName gender price',
        },
      ]),
      query,
    )
      .search(['location'])
      .filter()
  )
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
const myOrders = async (req: Request) => {
  const user = req.user as IReqUser;
  const query = req.query;
  const orderQuery = (
    await new QueryBuilder(
      Order.find({ user: user?.userId }).populate({
        path: 'product',
        select: 'productName images price',
      }),
      query,
    )
      .search(['location'])
      .filter()
  )
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
  myOrders,
};
