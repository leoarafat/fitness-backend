import QueryBuilder from '../../../builder/QueryBuilder';
import ApiError from '../../../errors/ApiError';
import { IReqUser } from '../user/user.interface';
import User from '../user/user.model';
import { IReview } from './reviews.interface';
import Review from './reviews.model';

const addReview = async (user: IReqUser, payload: IReview) => {
  const checkUser = await User.findById(user?.userId);
  if (!checkUser) {
    throw new ApiError(404, 'User not found. Please login');
  }
  const isReviewExist = await Review.findOne({ user: user?.userId });
  if (isReviewExist) {
    throw new ApiError(404, "You've already a review");
  } else {
    return await Review.create(payload);
  }
};
const getReviews = async (query: Record<string, unknown>) => {
  const ReviewQuery = (
    await new QueryBuilder(Review.find({}), query)
      .search(['title', 'description'])
      .filter()
  )
    .sort()
    .paginate()
    .fields();

  const result = await ReviewQuery.modelQuery;
  const meta = await ReviewQuery.countTotal();

  return {
    meta,
    data: result,
  };
};
const deleteReview = async (id: string) => {
  const isReviewExist = await Review.findOne({ _id: id });
  if (!isReviewExist) {
    throw new ApiError(404, 'Review not found');
  } else {
    return await Review.findByIdAndDelete(id);
  }
};
export const ReviewService = {
  addReview,
  getReviews,
  deleteReview,
};
