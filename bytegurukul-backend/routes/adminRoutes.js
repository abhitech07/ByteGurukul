const express = require('express');
const router = express.Router();
const { User, Course, Enrollment, Application } = require('../models');
const { protect } = require('../middleware/auth');

// Middleware to check if user is Admin
const adminOnly = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user);
        if (user.role !== 'Admin') {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @route   GET /api/admin/users
// @desc    Get all users list
router.get('/users', protect, adminOnly, async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/admin/user/:id
// @desc    Delete a user
router.delete('/user/:id', protect, adminOnly, async (req, res) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/admin/analytics
// @desc    Get dashboard stats
router.get('/analytics', protect, adminOnly, async (req, res) => {
    try {
        const totalUsers = await User.count();
        const totalCourses = await Course.count();
        const totalEnrollments = await Enrollment.count();
        const pendingApplications = await Application.count({ where: { status: 'Pending' }});

        res.json({
            success: true,
            data: {
                totalUsers,
                totalCourses,
                totalEnrollments,
                pendingApplications,
                earnings: totalEnrollments * 499 // Dummy calculation
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;