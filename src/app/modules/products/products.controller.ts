import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { ProductService } from './products.service';
import sendResponse from '../../../shared/sendResponse';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.createProduct(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product add successful',
    data: result,
  });
});
const allProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.allProducts(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product retrieved successful',
    data: result,
  });
});

export const ProductController = {
  createProduct,
  allProducts,
};
