const adminStatsService = require('#services/admin/admin.stats.service');

const getDashboardStats = async (req, res) => {
  try {
    const stats = await adminStatsService.getDashboardStatsService();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats
};
