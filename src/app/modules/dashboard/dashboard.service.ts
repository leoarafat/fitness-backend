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
export const DashboardService = {
  totalCount,
  getMonthlySubscriptionGrowth,
  getMonthlyUserGrowth,
};
