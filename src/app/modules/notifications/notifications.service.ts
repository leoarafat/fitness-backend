import { Request } from 'express';
import Notification from './notifications.model';
import ApiError from '../../../errors/ApiError';
import { IReqUser } from '../user/user.interface';

//Get
const getNotifications = async () => {
  const allNotification = await Notification.find().sort({ createdAt: -1 });
  const unreadNotification = await Notification.countDocuments({
    status: false,
  });
  const readNotification = await Notification.countDocuments({ status: true });
  return {
    allNotification,
    unreadNotification,
    readNotification,
  };
};

//Update
const updateNotification = async (req: Request) => {
  const id = req.params.id;

  const notification = await Notification.findById(id);
  if (!notification) {
    throw new ApiError(404, 'Notification not found');
  }

  const result = await Notification.findByIdAndUpdate(
    { _id: id },
    { $set: { status: true } },
    { new: true },
  ).sort({ createdAt: -1 });
  return result;
};

const updateAll = async () => {
  const result = await Notification.updateMany(
    { status: false },
    { $set: { status: true } },
    { new: true },
  ).sort({ createdAt: -1 });
  return result;
};

const myNotification = async (user: IReqUser) => {
  return await Notification.find({ user: user.userId }).sort({ createdAt: -1 });
};

export const NotificationService = {
  getNotifications,
  updateNotification,
  myNotification,
  updateAll,
};
