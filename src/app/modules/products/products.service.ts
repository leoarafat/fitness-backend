/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import { Products } from './products.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IGenericResponse } from '../../../interfaces/paginations';

import QueryBuilder from '../../../builder/QueryBuilder';
import { IProducts } from './products.interface';

const createProduct = async (req: Request) => {
  const { ...productData } = req.body;

  //@ts-ignore
  const images = req.files.image;
  if (!images) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Image cannot be empty');
  }

  const result = await Products.create({
    ...productData,
    images: images?.map((img: any) => `/images/image/${img.filename}`),
  });
  return result;
};

//!
const allProducts = async (
  query: Record<string, unknown>,
): Promise<IGenericResponse<IProducts[]>> => {
  const userQuery = new QueryBuilder(Products.find(), query)
    .search(['productName'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();

  return {
    meta,
    data: result,
  };
};
//!

const singleProduct = async (id: string) => {
  const result = await Products.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return result;
};
const deleteProduct = async (id: string) => {
  const product = await Products.findById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  const result = await Products.findByIdAndDelete(id);
  return result;
};
const updateProduct = async (req: Request) => {
  const { id } = req.params;
  const product = await Products.findById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const { ...productData } = req.body;

  //@ts-ignore
  const images = req.files?.image;

  if (images) {
    productData.images = images.map(
      (img: any) => `/images/image/${img.filename}`,
    );
  }

  const updatedProduct = await Products.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  });
  return updatedProduct;
};
export const ProductService = {
  createProduct,
  allProducts,
  singleProduct,
  deleteProduct,
  updateProduct,
};
