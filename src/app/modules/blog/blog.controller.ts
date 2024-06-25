/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { BlogService } from './blog.service';
import { IReqUser } from '../user/user.interface';
import sendResponse from '../../../shared/sendResponse';

const addBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.addBlog(req.user as IReqUser, req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog added successful',
    data: result,
  });
});
const getBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getBlogs(req.query, req.user as IReqUser);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog retrieved successful',
    //@ts-ignore
    data: result.data,
    //@ts-ignore
    meta: result.meta,
  });
});
const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getSingleBlog(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog retrieved successful',
    data: result,
  });
});
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.deleteBlog(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog delete successful',
    data: result,
  });
});
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const blogData = req.body;
  const imagesToDelete = req.body.imageToDelete || [];

  //@ts-ignore
  let blogImage = [];

  if (req.files && 'image' in req.files && req.files.image.length) {
    //@ts-ignore
    for (let image of req.files.image) {
      blogImage.push(`/images/image/${image.filename}`);
    }
  }
  const payload = {
    ...blogData,
    blogImage,
    imagesToDelete,
  };
  const result = await BlogService.updateBlog(id, payload);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog update successful',
    data: result,
  });
});

export const BlogController = {
  addBlog,
  getBlogs,
  getSingleBlog,
  deleteBlog,
  updateBlog,
};
