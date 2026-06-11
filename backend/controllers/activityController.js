const ActivityLog = require('../models/ActivityLog');

const logActivity = async ({ action, resource, description, admin, metadata }) => {
  try {
    await ActivityLog.create({ action, resource, description, admin, metadata });
  } catch (err) {
    console.error('Activity log error:', err.message);
  }
};

const getActivityLogs = async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const logs = await ActivityLog.find()
      .populate('admin', 'name email')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { logActivity, getActivityLogs };
