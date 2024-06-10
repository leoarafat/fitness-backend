/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import ApiError from '../../../errors/ApiError';
import { Banner } from './banner.model';
import httpStatus from 'http-status';
import fs from 'fs';
import path from 'path';

const addBanner = async (req: Request) => {
  //@ts-ignore
  const video = req.files?.video[0];
  const isExist = await Banner.findOne();
  if (isExist) {
    if (video) {
      const videoPath = path.join('uploads', 'videos', video.filename);

      if (fs.existsSync(videoPath)) {
        fs.unlinkSync(videoPath);
      }
    }
    throw new ApiError(httpStatus.BAD_REQUEST, 'All ready have an banner');
  }

  if (!video || !req.body.title) {
    throw new ApiError(404, 'Video and title is required');
  }
  return await Banner.create({
    video: `/videos/${video?.filename}`,
    title: req.body.title,
  });
};
const getBanner = async () => {
  return await Banner.findOne();
};
export const BannerService = {
  addBanner,
  getBanner,
};
