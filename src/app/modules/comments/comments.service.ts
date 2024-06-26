import { Request } from 'express';
import ApiError from '../../../errors/ApiError';
import { Classes } from '../class/class.model';
import User from '../user/user.model';
import { IComments, IReply } from './comments.interface';
import { Comment } from './comments.model';
import { IReqUser } from '../user/user.interface';
import QueryBuilder from '../../../builder/QueryBuilder';

const addComment = async (req: Request) => {
  const payload = req.body as IComments;
  const { userId } = req.user as IReqUser;

  const { classId, comment } = payload;

  const isExistUser = await User.findById(userId);

  if (!isExistUser) {
    throw new ApiError(404, 'User not found');
  }
  const isExistClass = await Classes.findById(classId);
  if (!isExistClass) {
    throw new ApiError(404, 'Class not found');
  }
  if (!comment) {
    throw new ApiError(500, 'Comment is empty');
  }
  payload.userId = userId as any;
  return await Comment.create(payload);
};
const addReply = async (req: Request) => {
  const payload = req.body as IReply;
  const { commentId, reply } = payload;
  const { userId } = req.user as IReqUser;

  if (!userId || !reply || !commentId) {
    throw new ApiError(400, 'adminId, reply, and commentId are required');
  }

  const isExistAdmin = await User.findById(userId);

  if (!isExistAdmin) {
    throw new ApiError(404, 'Admin not found');
  }

  const isExistComment = await Comment.findById(commentId);
  if (!isExistComment) {
    throw new ApiError(404, 'Comment not found');
  }

  isExistComment.reply.push({
    reply,
    adminId: userId,
  });

  await isExistComment.save();

  return isExistComment;
};
const allComments = async (query: Record<string, unknown>) => {
  const commentQuery = (
    await new QueryBuilder(Comment.find(), query).search(['comment']).filter()
  )
    .sort()
    .paginate()
    .fields();

  const result = await commentQuery.modelQuery;
  const meta = await commentQuery.countTotal();

  return {
    meta,
    data: result,
  };
};
const singleComment = async (req: Request) => {
  const { id } = req.params;
  return await Comment.findById(id);
};
const singleCommentByClass = async (req: Request) => {
  const limit = req.query.limit;
  const { id } = req.params;
  // const totalCommentInClass = await Comment.find({ classId: id });
  const { userId, role } = req.user as IReqUser;

  if (role === 'USER') {
    const result = await Comment.find({ classId: id, userId })
      .populate([
        {
          path: 'userId',
          select: 'email  profile_image',
        },
      ])
      .limit(Number(limit));
    const totalComment = await Comment.find({ classId: id, userId });
    return {
      comments: result,
      totalComment: totalComment?.length,
    };
  }
  if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
    const result = await Comment.find({ classId: id })
      .populate([
        {
          path: 'userId',
          select: 'email  profile_image',
        },
      ])
      .limit(Number(limit));
    const totalComment = await Comment.find({ classId: id });

    return {
      comments: result,
      totalComment: totalComment?.length,
    };
  }
};
export const CommentService = {
  addComment,
  addReply,
  allComments,
  singleComment,
  singleCommentByClass,
};
