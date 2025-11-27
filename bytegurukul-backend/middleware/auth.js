const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (e.g., "Bearer TOKEN")
      token = req.headers.authorization.split(' ')[1];
      
      // CRITICAL SECURITY FIX: Check if JWT_SECRET exists
      if (!process.env.JWT_SECRET) {
        console.error('FATAL ERROR: JWT_SECRET is not defined in environment variables.');
        return res.status(500).json({ message: 'Server Configuration Error' });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Attach user information to the request object
      req.user = decoded.id; // Assuming JWT payload contains user ID
      
      return next(); // FIX: Added return to stop execution here
    } catch (error) {
      console.error(error);
      // Frontend expects a 401 on error
      // FIX: Added return to prevent further execution
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    // FIX: Added return
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };