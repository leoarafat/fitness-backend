import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { CartService } from './cart.service';

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const result = await CartService.addToCart(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Add to cart successful',
    data: result,
  });
});
const myCartLists = catchAsync(async (req: Request, res: Response) => {
  const result = await CartService.myCartLists(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cart retrieved successful',
    data: result,
  });
});
const deleteCart = catchAsync(async (req: Request, res: Response) => {
  const result = await CartService.deleteCart(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cart delete successful',
    data: result,
  });
});

export const CartController = {
  addToCart,
  myCartLists,
  deleteCart,
};
