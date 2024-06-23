/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import fs from 'fs';
import path from 'path';
import { Logo } from './logo.model';

const addLogo = async (req: Request) => {
  //@ts-ignore
  const image = req.files?.image[0];
  const isExist = await Logo.findOne();
  if (isExist) {
    if (image) {
      const imagePath = path.join('uploads', 'images', 'image', image.filename);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    throw new ApiError(httpStatus.BAD_REQUEST, 'All ready have an Logo');
  }

  if (!image) {
    throw new ApiError(404, 'Image is required');
  }
  return await Logo.create({
    image: `/images/image/${image?.filename}`,
    ...req.body,
  });
};
const getLogo = async () => {
  return await Logo.findOne();
};
const updateLogo = async (req: Request) => {
  const id = req.params.id;
  const { files } = req;
  const logo = await Logo.findById(id);
  if (!logo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'logo not found');
  }

  const { ...logoData } = req.body;

  //@ts-ignore

  //@ts-ignore
  if (files && files?.image) {
    //@ts-ignore
    logoData.image = `/images/image/${files.image[0].filename}`;
  }

  const updatedLogo = await Logo.findByIdAndUpdate(id, logoData, {
    new: true,
    runValidators: true,
  });
  return updatedLogo;
};
const deleteLogo = async (id: string) => {
  const logo = await Logo.findById(id);
  if (!logo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'logo not found');
  }
  return await Logo.findByIdAndDelete(id);
};
export const LogoService = {
  addLogo,
  getLogo,
  updateLogo,
  deleteLogo,
};
