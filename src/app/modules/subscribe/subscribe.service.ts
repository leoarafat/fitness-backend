import Notification from '../notifications/notifications.model';
import Subscribe from './subscribe.model';

const insertIntoDB = async (payload: any) => {
  const result = await Subscribe.create(payload);
  await Notification.create({
    title: 'New Subscriber',
    message: `New subscriber from ${payload?.email}`,
  });
  return result;
};
const getSubscribeData = async () => {
  return await Subscribe.find({});
};
export const SubscribeService = {
  insertIntoDB,
  getSubscribeData,
};
