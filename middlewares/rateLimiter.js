// middleware/rateLimiter.js
const redisClient = require('../config/redisClient');


const rateLimiter = (options = {}) => {
  const {
    windowSeconds = 60,
    maxRequests = 10,
    keyPrefix = 'rate',
    identifier = (req) => req.ip
  } = options;

  return async (req, res, next) => {
    try {
      // Get client identifier (IP, user ID, etc.)
    
      const clientId = identifier(req);
      const key = `${keyPrefix}:${clientId}:${req.baseUrl}${req.path}`;

      // Increment request count
      const current = await redisClient.incr(key);

      // If first request in this window, set expiry
      if (current === 1) {
        await redisClient.expire(key, windowSeconds);
      }

      // Check if over limit
      if (current > maxRequests) {
        // Optionally include Retry-After header
        const ttl = await redisClient.ttl(key);
        res.set('Retry-After', ttl);
        return res.status(429).send( `Rate limit exceeded. Try again in ${ttl} seconds.`);
      }

      next();
    } catch (err) {
      console.error('Rate limiter error:', err);
      next();
    }
  };
};


module.exports = rateLimiter;

