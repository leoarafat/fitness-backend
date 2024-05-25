export type IReply = {
  text: string;
  status: 'pending' | 'replied';
};
export type IFeedback = {
  name: string;
  email: string;
  topic: string;
  reply: IReply;
};
