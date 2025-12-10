const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (e.g., "Bearer TOKEN")
      token = req.headers.authorization.split(' ')[1];
      
      if (!process.env.JWT_SECRET) {
        console.error('FATAL ERROR: JWT_SECRET is not defined in environment variables.');
        return res.status(500).json({ message: 'Server Configuration Error' });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Attach user information to the request object
      req.user = decoded.id; // Assuming JWT payload contains user ID
      
      return next(); // FIXED: Added return to stop function execution here
    } catch (error) {
      console.error(error);
      // Frontend expects a 401 on error
      return res.status(401).json({ message: 'Not authorized, token failed' }); // FIXED: Added return
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' }); // FIXED: Added return
  }
};

module.exports = { protect };