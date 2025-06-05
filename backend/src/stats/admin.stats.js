const Order = require('../orders/order.model');
const { createModuleLogger } = require('../config/logger');

const logger = createModuleLogger('admin-stats');

const adminStats = async (req, res) => {
  try {
    // Get total orders count
    const totalOrders = await Order.countDocuments();

    // Get total sales (sum of all order prices)
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$totalPrice' }
        }
      }
    ]);

    // Get trending books (books that appear most in orders)
    const trendingBooksData = await Order.aggregate([
      { $unwind: '$productsIds' },
      { $group: { _id: '$productsIds', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails'
        }
      },
      { $unwind: '$bookDetails' },
      {
        $project: {
          title: '$bookDetails.title',
          totalSold: '$count'
        }
      }
    ]);

    // Get monthly sales data for the chart
    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          totalSales: { $sum: '$totalPrice' },
          totalOrders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      totalOrders,
      totalSales: totalSales[0]?.totalSales || 0,
      trendingBooks: trendingBooksData,
      monthlySales
    });

  } catch (error) {
    logger.error('Error fetching admin stats', { error: error.message, stack: error.stack });
    res.status(500).json({ message: 'Failed to fetch admin stats' });
  }
};

module.exports = {
  adminStats
};