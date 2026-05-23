const Product = require('#models/misc/misc.product.model');
const Category = require('#models/misc/misc.category.model');
const Order = require('#models/misc/misc.order.model');
const User = require('#models/misc/misc.user.model');

exports.getDashboardStatsService = async () => {
    const now = new Date();
    
    // Normalize to start of today (local time)
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const sevenDaysAgo = new Date(startOfToday);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // Include today + 6 previous days

    const fourteenDaysAgo = new Date(startOfToday);
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 13);

    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });
    const pendingOrders = await Order.countDocuments({ status: 'Pending' });

    const [currentRevenue] = await Order.aggregate([
      { $match: { orderDate: { $gte: sevenDaysAgo }, status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const [previousRevenue] = await Order.aggregate([
      { $match: { orderDate: { $gte: fourteenDaysAgo, $lt: sevenDaysAgo }, status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const [allTimeRevenue] = await Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const currentWeekUsers = await User.countDocuments({ role: 'user', createdAt: { $gte: sevenDaysAgo } });
    const previousWeekUsers = await User.countDocuments({ role: 'user', createdAt: { $gte: fourteenDaysAgo, $lt: sevenDaysAgo } });

    const currentWeekPending = await Order.countDocuments({ status: 'Pending', orderDate: { $gte: sevenDaysAgo } });
    const previousWeekPending = await Order.countDocuments({ status: 'Pending', orderDate: { $gte: fourteenDaysAgo, $lt: sevenDaysAgo } });

    const [inventoryValue] = await Product.aggregate([
      { $group: { _id: null, totalValue: { $sum: '$price' }, avgPrice: { $avg: '$price' } } }
    ]);

    const salesHistory = await Order.aggregate([
      { $match: { orderDate: { $gte: sevenDaysAgo }, status: { $ne: 'Cancelled' } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
          total: { $sum: "$totalAmount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    const recentProducts = await Product.find().sort({ _id: -1 }).limit(5);

    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort({ orderDate: -1 })
      .limit(5);

    const calcChange = (current, previous) => {
      if (previous === 0 && current === 0) return { value: '0%', trend: 'up' };
      if (previous === 0) return { value: '+100%', trend: 'up' };
      const change = ((current - previous) / previous) * 100;
      const sign = change >= 0 ? '+' : '';
      return {
        value: `${sign}${change.toFixed(1)}%`,
        trend: change >= 0 ? 'up' : 'down'
      };
    };

    const revenueChange = calcChange(currentRevenue?.total || 0, previousRevenue?.total || 0);
    const usersChange = calcChange(currentWeekUsers, previousWeekUsers);
    const pendingChange = calcChange(currentWeekPending, previousWeekPending);

    return {
      summary: {
        totalProducts,
        totalCategories,
        totalUsers,
        pendingOrders,
        totalRevenue: allTimeRevenue?.total || 0,
        totalInventoryValue: inventoryValue?.totalValue || 0,
        averagePrice: inventoryValue?.avgPrice || 0,
        revenueChange,
        usersChange,
        pendingChange,
      },
      salesHistory,
      recentActivity: recentProducts.map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        image: p.image,
        time: 'Just now'
      })),
      recentOrders: recentOrders.map(o => ({
        id: o._id,
        customer: o.user?.name || 'Guest',
        amount: o.totalAmount,
        status: o.status,
        date: o.orderDate
      })),
    };
};
