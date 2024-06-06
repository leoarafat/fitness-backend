/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getYearRange } from '../../../helpers/getYears';
import { logger } from '../../../shared/logger';
import { Order } from '../orders/orders.model';
import { Subscription } from '../subscriptions/subscriptions.model';
import User from '../user/user.model';
import { getMonthName } from './Month';

const totalCount = async () => {
  try {
    const users = await User.countDocuments();

    const subscribers = await Subscription.countDocuments();

    const totalSellingProduct = await Order.countDocuments();

    const totalEarningResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: '$totalAmount' },
        },
      },
    ]);

    const totalEarning =
      totalEarningResult.length > 0 ? totalEarningResult[0].totalEarnings : 0;
    const newSubscribers = await Subscription.find({}).sort({ createdAt: -1 });

    return {
      users,
      subscribers,
      totalSellingProduct,
      totalEarning,
      newSubscribers,
    };
  } catch (error) {
    logger.error('Error in totalCount function: ', error);
    throw error;
  }
};

const getMonthlySubscriptionGrowth = async (year?: number) => {
  try {
    const currentYear = new Date().getFullYear();
    const selectedYear = year || currentYear;

    const { startDate, endDate } = getYearRange(selectedYear);

    const monthlySubscriptionGrowth = await Subscription.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: '$_id.month',
          year: '$_id.year',
          count: 1,
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);

    const result = [];
    for (let i = 1; i <= 12; i++) {
      const monthData = monthlySubscriptionGrowth.find(
        data => data.month === i,
      ) || { month: i, count: 0 };
      result.push(monthData);
    }

    return result;
  } catch (error) {
    logger.error('Error in getMonthlySubscriptionGrowth function: ', error);
    throw error;
  }
};
const getMonthlyUserGrowth = async (year?: number) => {
  try {
    const currentYear = new Date().getFullYear();
    const selectedYear = year || currentYear;

    const { startDate, endDate } = getYearRange(selectedYear);

    const monthlyUserGrowth = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: '$_id.month',
          year: '$_id.year',
          count: 1,
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);

    const result = [];
    for (let i = 1; i <= 12; i++) {
      const monthData = monthlyUserGrowth.find(data => data.month === i) || {
        month: i,
        count: 0,
      };
      result.push(monthData);
    }

    return result;
  } catch (error) {
    logger.error('Error in getMonthlyUserGrowth function: ', error);
    throw error;
  }
};
const totalIncomes = async () => {
  const totalSubscription = await Subscription.aggregate([
    {
      $group: {
        _id: null,
        totalEarnings: { $sum: '$amount' },
      },
    },
  ]);

  const totalEarning =
    totalSubscription.length > 0 ? totalSubscription[0].totalEarnings : 0;
  const totalEcommerce = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalEarnings: { $sum: '$totalAmount' },
      },
    },
  ]);
  const totalEarnings =
    totalEcommerce.length > 0 ? totalEcommerce[0].totalEarnings : 0;
  const totalIncome = totalEarning + totalEarnings;
  return {
    totalSubscriptionIncome: totalEarning,
    totalEcommerceIncome: totalEarnings,
    totalIncome,
  };
};
// const incomeGrowth = async () => {
//   const last12Months = new Date();
//   last12Months.setMonth(last12Months.getMonth() - 12);

//   const orderAggregation = [
//     { $match: { createdAt: { $gte: last12Months } } },
//     {
//       $group: {
//         _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
//         totalAmount: { $sum: '$totalAmount' },
//       },
//     },
//     { $sort: { '_id.year': 1, '_id.month': 1 } },
//   ];

//   const subscriptionAggregation = [
//     { $match: { createdAt: { $gte: last12Months } } },
//     {
//       $group: {
//         _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
//         totalAmount: { $sum: '$amount' },
//       },
//     },
//     { $sort: { '_id.year': 1, '_id.month': 1 } },
//   ];
//   //@ts-ignore
//   const orderAmounts = await Order.aggregate(orderAggregation);

//   const subscriptionAmounts = await Subscription.aggregate(
//     //@ts-ignore
//     subscriptionAggregation,
//   );

//   const combinedAmounts = {};

//   orderAmounts.forEach(order => {
//     const key = `${order._id.year}-${order._id.month}`;
//     //@ts-ignore
//     if (!combinedAmounts[key]) {
//       //@ts-ignore
//       combinedAmounts[key] = 0;
//     }
//     //@ts-ignore
//     combinedAmounts[key] += order.totalAmount;
//   });

//   subscriptionAmounts.forEach(subscription => {
//     const key = `${subscription._id.year}-${subscription._id.month}`;
//     //@ts-ignore
//     if (!combinedAmounts[key]) {
//       //@ts-ignore
//       combinedAmounts[key] = 0;
//     }
//     //@ts-ignore
//     combinedAmounts[key] += subscription.totalAmount;
//   });

//   const result = Object.keys(combinedAmounts).map(key => {
//     const [year, month] = key.split('-');
//     return {
//       year: parseInt(year),
//       month: parseInt(month),
//       //@ts-ignore
//       totalAmount: combinedAmounts[key],
//     };
//   });

//   return result;
// };

const incomeGrowth = async () => {
  try {
    const last12Months = new Date();
    last12Months.setMonth(last12Months.getMonth() - 12);

    const orderAggregation = [
      { $match: { createdAt: { $gte: last12Months } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          totalAmount: { $sum: '$totalAmount' },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ];

    const subscriptionAggregation = [
      { $match: { createdAt: { $gte: last12Months } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          totalAmount: { $sum: '$amount' },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ];

    const orderAmounts = await Order.aggregate(orderAggregation);
    const subscriptionAmounts = await Subscription.aggregate(
      subscriptionAggregation,
    );

    const analytics = orderAmounts.map(order => {
      const subscription = subscriptionAmounts.find(
        subscription =>
          subscription._id.year === order._id.year &&
          subscription._id.month === order._id.month,
      );

      return {
        year: order._id.year,
        month: getMonthName(order._id.month),
        totalOrderAmount: order.totalAmount,
        totalSubscriptionAmount: subscription ? subscription.totalAmount : 0,
      };
    });

    return { analytics };
  } catch (error) {
    logger.error(error);
    throw new Error('An error occurred while processing income growth data.');
  }
};

export const DashboardService = {
  totalCount,
  getMonthlySubscriptionGrowth,
  getMonthlyUserGrowth,
  totalIncomes,
  incomeGrowth,
};
