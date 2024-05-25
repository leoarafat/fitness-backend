/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import Conversation from './conversation.model';
import Message from './message.model';
import User from '../user/user.model';
import ApiError from '../../../errors/ApiError';
import { io } from '../../../socket/socket';

//* One to one conversation
const sendMessage = async (req: Request) => {
  try {
    // const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?.userId;
    const { files } = req;
    const data = req.body;
    //@ts-ignore
    // const images = files?.image[0];

    const { message } = data;

    const checkReceiverUser = await User.findById(receiverId);
    const checkSenderUser = await User.findById(senderId);

    if (checkReceiverUser === null || checkSenderUser === null) {
      throw new ApiError(404, 'Sender or Receiver user not found');
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
      isGroup: false,
    });
    // console.log(conversation, 'conversation');
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    let image = undefined;

    //@ts-ignore
    if (files && files?.image) {
      //@ts-ignore
      image = files.image[0].path;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      conversationId: conversation._id,
      image,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);

    if (conversation && newMessage) {
      //@ts-ignore
      io.to(receiverId).emit('getMessage', newMessage);
    }

    return newMessage;
  } catch (error) {
    //@ts-ignore
    console.log('Error in sendMessage controller: ', error?.message);
  }
};
//*
const sendGroupMessage = async (req: Request) => {
  try {
    const { message } = req.body;
    const conversationId = req.params.id;
    const senderId = req.user?.userId;

    // Check if sender exists
    const sender = await User.findById(senderId);
    if (!sender) {
      throw new ApiError(404, 'Sender user not found');
    }

    // Check if conversation exists and is a group chat
    const conversation = await Conversation.findOne({
      _id: conversationId,
      isGroup: true,
    });
    if (!conversation) {
      throw new ApiError(404, 'Group conversation not found');
    }

    // Create new message
    const newMessage = new Message({
      senderId,
      receiverId: conversationId,
      message,
      conversationId: conversationId,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKET IO FUNCTIONALITY WILL GO HERE
    io.to(conversationId).emit('newGroupMessage', newMessage);
    return newMessage;
  } catch (error) {
    //@ts-ignore
    console.log('Error in sendGroupMessage controller: ', error.message);
    throw new ApiError(500, 'Internal Server Error');
  }
};
//* Group conversation
const createGroupChat = async (req: Request) => {
  try {
    const { groupName, participants } = req.body;
    //@ts-ignore
    const { userId: creatorId } = req.user;
    console.log(creatorId, 'creatorId');
    // Check if creator exists
    const creator = await User.findById(creatorId);
    if (!creator) {
      throw new ApiError(404, 'Creator user not found');
    }

    // Create conversation for the group chat
    const conversation = await Conversation.create({
      isGroup: true,
      groupName,
      participants: [...participants, creatorId],
    });

    // Return conversation details
    return conversation;
  } catch (error) {
    //@ts-ignore
    console.log('Error in createGroupChat controller: ', error.message);
    //@ts-ignore
    throw new ApiError(500, error.message);
  }
};
//* Join Group
const joinGroup = async (req: Request, id: string) => {
  const userId = req?.user?.userId;
  const findGroup = await Conversation.findOne({
    $and: [{ _id: id }, { isGroup: true }],
  });
  const findUser = await User.findById(userId);
  if (!findUser) {
    throw new ApiError(404, 'User not found');
  }
  if (!findGroup) {
    throw new ApiError(404, 'Group not found');
  }
  const isUserExistInConversion = await Conversation.findOne({
    participants: { $in: [userId] },
    isGroup: true,
  });
  // console.log(userId);
  if (isUserExistInConversion) {
    throw new ApiError(400, `${findUser?.name} already exist in this group`);
  }
  // console.log(isUserExistInConversion);
  if (!isUserExistInConversion) {
    findGroup.participants.push(userId);
    await findGroup.save();
  }
  io.emit('joinChat', id);
  return findGroup;
};
//*
const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: conversationId } = req.params;
    // const senderId = req.user?.userId;

    const conversation = await Conversation.findOne({
      _id: conversationId,
    }).populate('messages');
    // const conversation = await Conversation.findOne({
    //   participants: { $all: [senderId, userToChatId] },
    // }).populate('messages');

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;
    io.emit('getMessages', messages);
    return messages;
  } catch (error) {
    //@ts-ignore
    console.log('Error in getMessages controller: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
//*
const getGroupMessages = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const conversation = await Conversation.findOne({
      _id: id,
    }).populate({
      path: 'messages',
      populate: {
        path: 'senderId',
        select: 'name email',
      },
    });

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;
    io.emit('getGroupMessages', messages);
    return messages;
  } catch (error) {
    //@ts-ignore
    console.log('Error in getMessages controller: ', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const messageService = {
  sendMessage,
  getMessages,
  createGroupChat,
  sendGroupMessage,
  joinGroup,
  getGroupMessages,
};
