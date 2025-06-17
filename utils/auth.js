const { verifyToken } = require('../utils/token');

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) 
    return res.status(401).json({ message: 'No token' });
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
