import Subscribe from './subscribe.model';

const insertIntoDB = async (payload: any) => {
  const result = await Subscribe.create(payload);
  return result;
};
const getSubscribeData = async () => {
  return await Subscribe.find({});
};
export const SubscribeService = {
  insertIntoDB,
  getSubscribeData,
};
