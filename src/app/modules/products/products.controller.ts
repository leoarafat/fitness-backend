/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-ts-comment */
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
  // const result = await ProductService.allProducts(filters, paginationOptions);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product retrieved successful',
    data: result,
  });
});
const singleProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.singleProduct(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product retrieved successful',
    data: result,
  });
});
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.deleteProduct(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product deleted successful',
    data: result,
  });
});
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const productData = req.body;
  const imagesToDelete = req.body.imageToDelete || [];

  //@ts-ignore
  let productImage = [];

  if (req.files && 'image' in req.files && req.files.image.length) {
    //@ts-ignore
    for (let image of req.files.image) {
      productImage.push(`/images/image/${image.filename}`);
    }
  }
  const payload = {
    ...productData,
    productImage,
    imagesToDelete,
  };
  const result = await ProductService.updateProduct(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product update successful',
    data: result,
  });
});

export const ProductController = {
  createProduct,
  allProducts,
  singleProduct,
  deleteProduct,
  updateProduct,
};
