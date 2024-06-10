import { IComments } from './comments.interface';

const addComment = async (payload: Partial<IComments>) => {
  const { userId, classId } = payload;
};

export const CommentService = {
  addComment,
};
