import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { OrderService } from './orders.service';
import sendResponse from '../../../shared/sendResponse';

const makeOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.makeOrder(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order place successful',
    data: result,
  });
});
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order retrieved successful',
    data: result,
  });
});

export const OrderController = {
  makeOrder,
  getAllOrders,
};
