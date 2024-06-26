/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import QueryBuilder from '../../../builder/QueryBuilder';
import { FeedBack } from './feedback.model';
import { IReqUser } from '../user/user.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const sendFeedBack = async (req: Request) => {
  const { text } = req.body;
  const { userId } = req.user as IReqUser;
  return await FeedBack.create({ text, user: userId });
};
const getFeedback = async (query: Record<string, unknown>) => {
  const FeedBackQuery = (
    await new QueryBuilder(
      FeedBack.find({ approveStatus: 'approved' })
        .sort({ createdAt: -1 })
        .populate({
          path: 'user',
          select: 'name profile_image email role',
        }),
      query,
    )
      .search(['name', 'email'])
      .filter()
  )
    .sort()
    .paginate()
    .fields();

  const result = await FeedBackQuery.modelQuery;
  const meta = await FeedBackQuery.countTotal();

  return {
    meta,
    data: result,
  };
};
const getFeedbackForAdmin = async (query: Record<string, unknown>) => {
  const FeedBackQuery = (
    await new QueryBuilder(
      FeedBack.find({}).sort({ createdAt: -1 }).populate({
        path: 'user',
        select: 'name profile_image email role',
      }),
      query,
    )
      .search(['name', 'email'])
      .filter()
  )
    .sort()
    .paginate()
    .fields();

  const result = await FeedBackQuery.modelQuery;
  const meta = await FeedBackQuery.countTotal();

  return {
    meta,
    data: result,
  };
};
const approvedFeedback = async (id: string) => {
  const isExist = await FeedBack.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
  }
  return await FeedBack.findByIdAndUpdate(
    id,
    { approveStatus: 'approved' },
    { new: true, runValidators: true },
  );
};
const deleteFeedback = async (id: string) => {
  const isExist = await FeedBack.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
  }
  return await FeedBack.findByIdAndDelete(id);
};
export const FeedBackService = {
  sendFeedBack,
  getFeedback,
  getFeedbackForAdmin,
  approvedFeedback,
  deleteFeedback,
};
