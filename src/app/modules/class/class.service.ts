/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Classes } from './class.model';
import { IGenericResponse } from '../../../interfaces/paginations';
import { IClass } from './class.interface';
import QueryBuilder from '../../../builder/QueryBuilder';

const createClass = async (req: Request) => {
  const { ...classData } = req.body;
  const { files } = req;
  let pdfFile = undefined;
  //@ts-ignore
  if (files?.pdf) {
    //@ts-ignore
    pdfFile = files?.pdf[0].path;
  }
  let docFile = undefined;
  //@ts-ignore
  if (files?.docs) {
    //@ts-ignore
    docFile = files?.docs[0].path;
  }
  let video = undefined;
  //@ts-ignore
  if (files?.video) {
    //@ts-ignore
    video = files?.docs[0].path;
  }

  if (!pdfFile || !docFile || !video) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'All file is required');
  }
  const result = await Classes.create({
    ...classData,
    pdfFile,
    docFile,
    video,
  });
  return result;
};

const allClasses = async (
  query: Record<string, unknown>,
): Promise<IGenericResponse<IClass[]>> => {
  const userQuery = new QueryBuilder(Classes.find(), query)
    .search(['topic', 'title'])
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
// const singleProduct = async (id: string) => {
//   const result = await Products.findById(id);
//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
//   }
//   return result;
// };
// const deleteProduct = async (id: string) => {
//   const product = await Products.findById(id);
//   if (!product) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
//   }
//   const result = await Products.findByIdAndDelete(id);
//   return result;
// };
// const updateProduct = async (req: Request) => {
//   const { id } = req.params;
//   const product = await Products.findById(id);
//   if (!product) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
//   }

//   const { ...productData } = req.body;

//   //@ts-ignore
//   const images = req.files?.image;

//   if (images) {
//     productData.images = images.map((img: any) => img.path);
//   }

//   const updatedProduct = await Products.findByIdAndUpdate(id, productData, {
//     new: true,
//     runValidators: true,
//   });
//   return updatedProduct;
// };
export const ClassService = {
  createClass,
  allClasses,
};
