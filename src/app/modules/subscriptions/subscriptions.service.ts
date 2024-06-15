/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import { SubscriptionPlan } from '../subscriptions-plan/subscriptions-plan.model';
import ApiError from '../../../errors/ApiError';
import { Subscription } from './subscriptions.model';

import { IReqUser } from '../user/user.interface';
import User from '../user/user.model';

import QueryBuilder from '../../../builder/QueryBuilder';

const upgradeSubscription = async (req: Request) => {
  const { planId, transactionId, payment_status, amount } = req.body;
  const checkUser = await User.findById(req?.user?.userId);

  if (!checkUser) {
    throw new ApiError(404, 'User not found');
  }
  const subscriptionPlan = await SubscriptionPlan.findById(planId);

  if (!subscriptionPlan) {
    throw new ApiError(404, 'Plan not found');
  }
  checkUser.isSubscribed = true;
  const startDate = new Date();
  const endDate = new Date(
    startDate.getTime() + subscriptionPlan.duration * 24 * 60 * 60 * 1000,
  );

  const subscription = await Subscription.create({
    plan_id: planId,
    plan_type: subscriptionPlan?.plan_type,
    user_id: req?.user?.userId,
    payment_status: payment_status,
    amount,
    startDate,
    endDate,
    transactionId: transactionId,
  });
  await checkUser.save();
  return subscription;
};
const AllSubscriber = async (query: Record<string, unknown>) => {
  const orderQuery = (
    await new QueryBuilder(Subscription.find().populate('user_id'), query)
      .search(['plan_type'])
      .filter()
  )
    .sort()
    .paginate()
    .fields();

  const result = await orderQuery.modelQuery;

  const meta = await orderQuery.countTotal();

  return {
    meta,
    data: result,
  };
};
// const AllSubscriber = async (
//   filters: any,
//   paginationOptions: IPaginationOptions,
//   fields: any,
// ) => {
//   const { searchTerm, ...filtersData } = filters;
//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelpers.calculatePagination(paginationOptions);
//   const andConditions: any[] = [];
//   if (searchTerm) {
//     const fuzzySearchRegex = new RegExp([...searchTerm].join('.*'), 'i');

//     andConditions.push({
//       $or: [
//         ...['plan_type'].map(field => ({
//           [field]: {
//             $regex: fuzzySearchRegex,
//           },
//         })),
//         {
//           user_id: {
//             $in: await User.find({
//               $or: [{ plan_type: { $regex: fuzzySearchRegex } }],
//             }).distinct('_id'),
//           },
//         },
//       ],
//     });
//   }
//   if (Object.keys(filtersData).length) {
//     andConditions.push({
//       $and: Object.entries(filtersData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     });
//   }
//   // andConditions.push({
//   //   $or: [
//   //     { plan_type:  },

//   //   ],
//   // });

//   const projection: { [key: string]: 1 } = {};
//   if (fields) {
//     fields.split(',').forEach((field: string) => {
//       projection[field.trim()] = 1;
//     });
//   }
//   const sortConditions: { [key: string]: SortOrder } = {};

//   if (sortBy && sortOrder) {
//     sortConditions[sortBy] = sortOrder;
//   }
//   const whereConditions =
//     andConditions.length > 0 ? { $and: andConditions } : {};

//   const result = await Subscription.find(whereConditions)
//     .select(projection)

//     .populate('user_id')
//     .sort(sortConditions)
//     .skip(skip)
//     .limit(limit);

//   const userIds = [...new Set(result.map(sub => sub.user_id))];

//   const users = await User.find({ _id: { $in: userIds } });

//   const total = users?.length;

//   const totalPage = Math.ceil(total / limit);

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//       totalPage,
//     },
//     data: users,
//   };
// };
const mySubscription = async (req: Request) => {
  const { userId } = req.user as IReqUser;
  const isExistUser = await User.findById(userId);
  if (!isExistUser) {
    throw new ApiError(404, 'User not found');
  }
  const subscription = await Subscription.findOne({ user_id: userId });
  if (!subscription) {
    return null;
  }
  return subscription;
};
export const SubscriptionService = {
  upgradeSubscription,
  AllSubscriber,
  mySubscription,
};
