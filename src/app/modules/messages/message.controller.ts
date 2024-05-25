import { Request, RequestHandler, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchasync';
import { messageService } from './message.service';
const sendMessage: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await messageService.sendMessage(req);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Message Send`,
      data: result,
    });
  },
);
const sendGroupMessage: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await messageService.sendGroupMessage(req);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Message Send`,
      data: result,
    });
  },
);
const createGroupChat: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await messageService.createGroupChat(req);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Group Created`,
      data: result,
    });
  },
);
const joinGroup: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await messageService.joinGroup(req, req.params.id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Joined in group`,
      data: result,
    });
  },
);
const getMessages: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await messageService.getMessages(req, res);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      data: result,
    });
  },
);
const getGroupMessages: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await messageService.getGroupMessages(req, res);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Retrieved Group Message',
      data: result,
    });
  },
);
export const messageController = {
  sendMessage,
  getMessages,
  messageService,
  createGroupChat,
  joinGroup,
  sendGroupMessage,
  getGroupMessages,
};
