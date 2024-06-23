import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Products } from '../products/products.model';
import { Cart } from './cart.model';
import { Request } from 'express';
import { IReqUser } from '../user/user.interface';

const addToCart = async (req: Request) => {
  const { id } = req.params;
  const data = req.body;

  const { userId } = req.user as IReqUser;
  const findProduct = await Products.findById(id);
  if (!findProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  return await Cart.create({
    productId: id,
    user: userId,
    quantity: data?.quantity,
  });
};
const myCartLists = async (req: Request) => {
  const { userId } = req.user as IReqUser;
  return await Cart.find({ user: userId }).populate('productId');
};

const deleteCart = async (id: string) => {
  const isExist = await Cart.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }
  return await Cart.findOneAndDelete({ _id: id });
};

export const CartService = {
  addToCart,
  myCartLists,
  deleteCart,
};
