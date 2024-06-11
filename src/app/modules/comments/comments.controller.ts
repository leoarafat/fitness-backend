import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { CommentService } from './comments.service';

const addComment = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.addComment(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Comment Add successful',
    data: result,
  });
});
const addReply = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.addReply(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Comment Add successful',
    data: result,
  });
});
const allComments = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.allComments(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Comment Retrieved successful',
    data: result,
  });
});
const singleComment = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.singleComment(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Comment Retrieved successful',
    data: result,
  });
});
const singleCommentByClass = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.singleCommentByClass(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Comment Retrieved successful',
    data: result,
  });
});

export const CommentController = {
  addComment,
  addReply,
  allComments,
  singleComment,
  singleCommentByClass,
};
