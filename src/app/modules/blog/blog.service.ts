/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import { IReqUser } from '../user/user.interface';
import Blog from './blog.model';
import ApiError from '../../../errors/ApiError';
import QueryBuilder from '../../../builder/QueryBuilder';
import httpStatus from 'http-status';

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
    images: images?.map((img: any) => img.path),
    ...blogData,
  };
  return await Blog.create(data);
};
//*
const getBlogs = async (query: Record<string, unknown>) => {
  const postQuery = new QueryBuilder(Blog.find({}), query)
    .search(['title', 'topic', 'description'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await postQuery.modelQuery;
  const meta = await postQuery.countTotal();

  return {
    meta,
    data: result,
  };
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
const updateBlog = async (req: Request) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'blog not found');
  }

  const { ...blogData } = req.body;

  //@ts-ignore
  const images = req.files?.image;

  if (images) {
    blogData.images = images.map((img: any) => img.path);
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blogData, {
    new: true,
    runValidators: true,
  });
  return updatedBlog;
};

export const BlogService = {
  addBlog,
  getBlogs,
  getSingleBlog,
  deleteBlog,
  updateBlog,
};
