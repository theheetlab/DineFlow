const Cache = require('../models/Cache');

const cache = (ttlSeconds = 300) => async (req, res, next) => {
  const key = `cache:${req.originalUrl}`;
  try {
    const cached = await Cache.findOne({ key, expiresAt: { $gt: new Date() } });
    if (cached) return res.json(cached.data);

    const originalJson = res.json.bind(res);
    res.json = async (data) => {
      try {
        await Cache.findOneAndUpdate(
          { key },
          { key, data, expiresAt: new Date(Date.now() + ttlSeconds * 1000) },
          { upsert: true }
        );
      } catch {}
      originalJson(data);
    };
    next();
  } catch {
    next();
  }
};

const clearCache = (...patterns) => async (req, res, next) => {
  const originalJson = res.json.bind(res);
  res.json = async (data) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      try {
        if (patterns.length === 0) {
          await Cache.deleteMany({});
        } else {
          const orConditions = patterns.map(p => ({ key: { $regex: `^cache:${p}` } }));
          await Cache.deleteMany({ $or: orConditions });
        }
      } catch {}
    }
    originalJson(data);
  };
  next();
};

module.exports = { cache, clearCache };
