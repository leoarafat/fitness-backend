/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import QueryBuilder from '../../../builder/QueryBuilder';
import { FeedBack } from './feedback.model';
import { IReqUser } from '../user/user.interface';

const sendFeedBack = async (req: Request) => {
  const { text } = req.body;
  const { userId } = req.user as IReqUser;
  return await FeedBack.create({ text, user: userId });
};
const getFeedback = async (query: Record<string, unknown>) => {
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

export const FeedBackService = {
  sendFeedBack,
  getFeedback,
};
