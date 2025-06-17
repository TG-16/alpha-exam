const pool = require('../models/db');

module.exports = async (req, res, next) => {
  const deviceId = req.headers['x-device-id'];
  if (!deviceId) 
    return res.status(400).json({ message: 'Device ID missing' });
  const [rows] = await pool.execute('SELECT * FROM login_sessions WHERE user_id = ? AND device_id != ?', [req.user.id, deviceId]);
  if (rows.length > 0) 
    return res.status(403).json({ message: 'User already logged in from another device' });
  next();
};