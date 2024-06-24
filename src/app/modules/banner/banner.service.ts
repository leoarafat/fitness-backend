/* eslint-disable @typescript-eslint/ban-ts-comment */

import ApiError from '../../../errors/ApiError';
import { Banner } from './banner.model';
import httpStatus from 'http-status';
import fs from 'fs';
import path from 'path';
import { CustomRequest } from '../../../interfaces/common';
//*
// const addBanner = async (req: CustomRequest) => {
//   const { files, body } = req;

//   let video = undefined;
//   let logo = undefined;

//   const isExist = await Banner.findOne();
//   if (isExist) {
//     if (video) {
//       //@ts-ignore
//       const videoPath = path.join('uploads', 'videos', video.filename);

//       if (fs.existsSync(videoPath)) {
//         fs.unlinkSync(videoPath);
//       }
//     }
//     throw new ApiError(httpStatus.BAD_REQUEST, 'All ready have an banner');
//   }

//   if (files?.video) {
//     video = `/videos/${files.video[0].filename}`;
//   }
//   if (files?.logo) {
//     logo = `/images/image/${files.logo[0].filename}`;
//   }
//   return await Banner.create({
//     video,
//     logo,
//     //@ts-ignore
//     title: body && body.title,
//   });
// };
//*
const addBanner = async (req: CustomRequest) => {
  const { files, body } = req;

  let video: string | undefined = undefined;
  let logo: string | undefined = undefined;

  const existingBanner = await Banner.findOne();

  if (existingBanner) {
    if (files?.video && existingBanner.video) {
      const oldVideoPath = path.join(
        'uploads',
        'videos',
        //@ts-expect-error
        existingBanner.filename,
      );
      if (fs.existsSync(oldVideoPath)) {
        fs.unlinkSync(oldVideoPath);
      }
      video = `/videos/${files.video[0].filename}`;
    } else {
      //@ts-expect-error
      video = existingBanner.video;
    }

    if (files?.image && existingBanner.logo) {
      const oldLogoPath = path.join(
        'uploads',
        'images',
        'image',
        existingBanner.logo,
      );
      if (fs.existsSync(oldLogoPath)) {
        fs.unlinkSync(oldLogoPath);
      }
      logo = `/images/image/${files.image[0].filename}`;
    } else {
      //@ts-expect-error
      logo = existingBanner.logo;
    }

    existingBanner.video = video;
    existingBanner.logo = logo;
    //@ts-expect-error
    existingBanner.title = body && body.title;

    await existingBanner.save();
    return existingBanner;
  } else {
    if (files?.video) {
      video = `/videos/${files.video[0].filename}`;
    }
    if (files?.image) {
      logo = `/images/image/${files.image[0].filename}`;
    }

    const newBanner = await Banner.create({
      video,
      logo,
      //@ts-expect-error
      title: body && body.title,
    });

    return newBanner;
  }
};
const getBanner = async () => {
  return await Banner.findOne();
};
const updateBanner = async (req: CustomRequest) => {
  const id = req.params.id;
  const { files } = req;
  const banner = await Banner.findById(id);
  if (!banner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'banner not found');
  }

  const { ...bannerData } = req.body;

  if (files && files?.video) {
    //@ts-ignore
    bannerData.video = `/videos/${files.video[0].filename}`;
  }
  if (files && files?.image) {
    //@ts-ignore
    bannerData.logo = `/images/image/${files.image[0].filename}`;
  }

  const updatedBanner = await Banner.findByIdAndUpdate(id, bannerData, {
    new: true,
    runValidators: true,
  });
  return updatedBanner;
};
const deleteBanner = async (id: string) => {
  const banner = await Banner.findById(id);
  if (!banner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'banner not found');
  }
  return await Banner.findByIdAndDelete(id);
};
export const BannerService = {
  addBanner,
  getBanner,
  updateBanner,
  deleteBanner,
};
