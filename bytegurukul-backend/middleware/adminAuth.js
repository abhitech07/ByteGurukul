const { User } = require('../models');

// @desc    Middleware to verify user is admin
const adminAuth = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        const user = await User.findByPk(req.user);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Admin access required" });
        }

        next();
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { adminAuth };
