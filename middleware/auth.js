import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // This sets req.user.id = donor ID from JWT
    next(); // ✅ This is critical! Without this, the route won't continue
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default verifyToken;