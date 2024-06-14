/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getYearRange } from '../../../helpers/getYears';
import { logger } from '../../../shared/logger';
import { Order } from '../orders/orders.model';
import { Subscription } from '../subscriptions/subscriptions.model';
import User from '../user/user.model';

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
    const newSubscribers = await Subscription.find({})
      .sort({ createdAt: -1 })
      .populate('user_id');

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

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const result = [];
    for (let i = 1; i <= 12; i++) {
      const monthData = monthlySubscriptionGrowth.find(
        data => data.month === i,
      ) || { month: i, count: 0, year: selectedYear };
      result.push({
        ...monthData,
        month: months[i - 1], // Convert month number to month name
      });
    }

    return {
      year: selectedYear,
      data: result,
    };
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

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const result = [];
    for (let i = 1; i <= 12; i++) {
      const monthData = monthlyUserGrowth.find(data => data.month === i) || {
        month: i,
        count: 0,
        year: selectedYear,
      };
      result.push({
        ...monthData,
        month: months[i - 1], // Convert month number to month name
      });
    }

    return {
      year: selectedYear,
      data: result,
    };
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

const incomeGrowth = async (year?: number) => {
  try {
    const now = new Date();
    const currentYear = year || now.getFullYear(); // Use the provided year or default to the current year
    const startDate = new Date(currentYear, 0, 1);
    const endDate = new Date(currentYear + 1, 0, 1);

    const orderAggregation = [
      { $match: { createdAt: { $gte: startDate, $lt: endDate } } },
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
      { $match: { createdAt: { $gte: startDate, $lt: endDate } } },
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

    //@ts-ignore
    const orderAmounts = await Order.aggregate(orderAggregation);
    const subscriptionAmounts = await Subscription.aggregate(
      //@ts-ignore
      subscriptionAggregation,
    );

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const allMonths = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentYear, i, 1);
      allMonths.push({
        year: date.getFullYear(),
        month: i + 1,
        monthName: months[i],
      });
    }

    const analytics = allMonths.map(({ year, month, monthName }) => {
      const order = orderAmounts.find(
        order => order._id.year === year && order._id.month === month,
      );
      const subscription = subscriptionAmounts.find(
        subscription =>
          subscription._id.year === year && subscription._id.month === month,
      );

      return {
        year,
        month: monthName,
        totalOrderAmount: order ? order.totalAmount : 0,
        totalSubscriptionAmount: subscription ? subscription.totalAmount : 0,
      };
    });

    return {
      statusCode: 200,
      success: true,
      message: 'Data retrieved successfully',
      data: {
        analytics,
      },
    };
  } catch (error) {
    logger.error(error);
    throw new Error('An error occurred while processing income growth data.');
  }
};

const subscriptionUserDetails = async () => {
  const subscriptions = await Subscription.find({}).populate([
    {
      path: 'user_id',
      select: 'name email',
    },
    {
      path: 'plan_id',
      select: 'title price',
    },
  ]);
  return subscriptions;
};
const ecommerceUserDetails = async () => {
  const ecommerce = await Order.find({}).populate([
    {
      path: 'user',
      select: 'name email',
    },
    {
      path: 'product',
      select: 'productName price',
    },
  ]);
  return ecommerce;
};

export const DashboardService = {
  totalCount,
  getMonthlySubscriptionGrowth,
  getMonthlyUserGrowth,
  totalIncomes,
  incomeGrowth,
  subscriptionUserDetails,
  ecommerceUserDetails,
};
