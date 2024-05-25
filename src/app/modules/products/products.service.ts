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
    images: images?.map((img: any) => img.path),
  });
  return result;
};

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
export const ProductService = {
  createProduct,
  allProducts,
};
