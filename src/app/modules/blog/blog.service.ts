/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import { IReqUser } from '../user/user.interface';
import Blog from './blog.model';
import ApiError from '../../../errors/ApiError';
import QueryBuilder from '../../../builder/QueryBuilder';
import httpStatus from 'http-status';
import unlinkFile from '../../../utils/unLink';

import { ENUM_USER_ROLE } from '../../../enums/user';
import { Subscription } from '../subscriptions/subscriptions.model';

//*
const addBlog = async (user: IReqUser, req: Request) => {
  const blogData = req.body;
  const { files } = req;
  //@ts-ignore
  const images = files.image;
  if (!images) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Image cannot be empty');
  }
  const data = {
    created_by: user?.userId,
    images: images?.map((img: any) => `/images/image/${img.filename}`),
    ...blogData,
  };
  return await Blog.create(data);
};
//*
const getBlogs = async (query: Record<string, unknown>, user: IReqUser) => {
  const { userId, role } = user;

  const findSubscription = await Subscription.findOne({ user_id: userId });

  if (
    role !== ENUM_USER_ROLE.ADMIN &&
    role !== ENUM_USER_ROLE.SUPER_ADMIN &&
    (!findSubscription || findSubscription === null)
  ) {
    throw new ApiError(404, "You haven't Subscription");
  }

  if (
    findSubscription &&
    findSubscription.status === 'active' &&
    findSubscription.plan_type === 'basic'
  ) {
    const postQuery = (
      await new QueryBuilder(Blog.find({ accessType: 'basic' }), query)
        .search(['title', 'topic', 'description'])
        .filter()
    )
      .sort()
      .paginate()
      .fields();

    const result = await postQuery.modelQuery;
    const meta = await postQuery.countTotal();

    return {
      meta,
      data: result,
    };
  }
  if (
    findSubscription &&
    findSubscription.status === 'active' &&
    findSubscription.plan_type === 'standard'
  ) {
    const postQuery = (
      await new QueryBuilder(
        Blog.find({ accessType: { $in: ['basic', 'standard'] } }),
        query,
      )
        .search(['title', 'topic', 'description'])
        .filter()
    )
      .sort()
      .paginate()
      .fields();

    const result = await postQuery.modelQuery;
    const meta = await postQuery.countTotal();

    return {
      meta,
      data: result,
    };
  }
  if (
    findSubscription &&
    findSubscription.status === 'active' &&
    findSubscription.plan_type === 'premium'
  ) {
    const postQuery = (
      await new QueryBuilder(
        Blog.find({ accessType: { $in: ['basic', 'standard', 'premium'] } }),
        query,
      )
        .search(['title', 'topic', 'description'])
        .filter()
    )
      .sort()
      .paginate()
      .fields();

    const result = await postQuery.modelQuery;
    const meta = await postQuery.countTotal();

    return {
      meta,
      data: result,
    };
  }
  if (role === ENUM_USER_ROLE.ADMIN || role === ENUM_USER_ROLE.SUPER_ADMIN) {
    const postQuery = (
      await new QueryBuilder(Blog.find({}), query)
        .search(['title', 'topic', 'description'])
        .filter()
    )
      .sort()
      .paginate()
      .fields();

    const result = await postQuery.modelQuery;
    const meta = await postQuery.countTotal();

    return {
      meta,
      data: result,
    };
  }
};
//*
const getSingleBlog = async (id: string) => {
  const isExist = await Blog.findById(id);
  if (!isExist) {
    throw new ApiError(404, 'Blog not found');
  }
  return isExist;
};
//*
const deleteBlog = async (id: string) => {
  const isExist = await Blog.findById(id);
  if (!isExist) {
    throw new ApiError(404, 'Blog not found');
  }
  return await Blog.findByIdAndDelete(id);
};
//*

//*
const updateBlog = async (id: string, payload: any) => {
  // console.log(payload);
  const isExistBlog = await Blog.findById(id);
  if (!isExistBlog) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog doesn't exist!");
  }

  //filter file
  const updatedImages = isExistBlog.images.filter(
    image => !payload?.imageToDelete?.includes(image),
  );

  //@ts-ignore
  if (payload.imageToDelete) {
    unlinkFile(payload.imageToDelete);
  }

  if (payload.blogImage.length > 0) {
    //@ts-ignore
    updatedImages.push(...payload.blogImage);
  }
  const updateData = {
    ...payload,
    images: updatedImages.length > 0 ? updatedImages : isExistBlog.images,
  };

  //update product
  const result = await Blog.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  });
  return result;
};
export const BlogService = {
  addBlog,
  getBlogs,
  getSingleBlog,
  deleteBlog,
  updateBlog,
};
