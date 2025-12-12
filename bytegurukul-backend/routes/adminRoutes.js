const express = require('express');
const router = express.Router();
const { User, Course, Enrollment, Application } = require('../models');
const { protect } = require('../middleware/auth');
const { Op } = require('sequelize');
const ExcelJS = require('exceljs');

// Middleware to check if user is Admin
const adminOnly = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user);
        if (user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. admins only." });
        }
        next();
    } catch (err) {
        console.error('Admin check error:', err);
        res.status(500).json({ message: "Server Error" });
    }
};

// @route   GET /api/admin/users
// @desc    Get all users list with search & filter
router.get('/users', protect, adminOnly, async (req, res) => {
    try {
        const { search, role, page = 1, limit = 10 } = req.query;
        const where = {};
        
        if (search) {
            where[Op.or] = [
                { username: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } }
            ];
        }
        if (role) where.role = role;

        const users = await User.findAll({
            where,
            attributes: { exclude: ['password'] },
            limit: Number.parseInt(limit),
            offset: (Number.parseInt(page) - 1) * Number.parseInt(limit),
            order: [['createdAt', 'DESC']]
        });

        const total = await User.count({ where });

        res.json({ success: true, data: users, pagination: { total, page, limit } });
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
// @desc    Get dashboard stats with actual earnings calculation
router.get('/analytics', protect, adminOnly, async (req, res) => {
    try {
        const totalUsers = await User.count();
        const totalCourses = await Course.count();
        const totalEnrollments = await Enrollment.count();
        const pendingApplications = await Application.count({ where: { status: 'Pending' }});
        const studentCount = await User.count({ where: { role: 'student' } });
        const instructorCount = await User.count({ where: { role: 'instructor' } });

        // Calculate actual earnings from course prices
        const enrollmentsWithPrices = await Enrollment.findAll({
            attributes: [
                [require('sequelize').fn('SUM', require('sequelize').col('Course.price')), 'totalRevenue']
            ],
            include: [
                {
                    model: Course,
                    attributes: [],
                    required: true
                }
            ],
            raw: true
        });

        const totalRevenue = enrollmentsWithPrices[0]?.totalRevenue || 0;

        // Get revenue breakdown by instructor
        const instructorRevenue = await Enrollment.findAll({
            attributes: [
                [require('sequelize').fn('SUM', require('sequelize').col('Course.price')), 'revenue']
            ],
            include: [
                {
                    model: Course,
                    attributes: ['title', 'instructorId'],
                    include: [
                        {
                            model: User,
                            as: 'instructor',
                            attributes: ['id', 'name', 'email']
                        }
                    ]
                }
            ],
            group: ['Course.instructorId'],
            raw: false,
            subQuery: false
        });

        res.json({
            success: true,
            data: {
                totalUsers,
                totalCourses,
                totalEnrollments,
                pendingApplications,
                studentCount,
                instructorCount,
                totalRevenue: Number.parseFloat(totalRevenue),
                instructorRevenue: instructorRevenue.map(item => ({
                    instructorId: item.Course?.instructorId,
                    instructorName: item.Course?.instructor?.name,
                    instructorEmail: item.Course?.instructor?.email,
                    revenue: Number.parseFloat(item.dataValues?.revenue || 0)
                }))
            }
        });
    } catch (error) {
        console.error('Analytics error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/admin/settings
// @desc    Update admin settings
router.post('/settings', protect, adminOnly, async (req, res) => {
    try {
        const { commissionRate, maintenanceMode, supportEmail } = req.body;
        // In production, store these in a Settings model or env
        res.json({ 
            success: true, 
            message: "Settings updated",
            data: { commissionRate, maintenanceMode, supportEmail }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/admin/analytics/export
// @desc    Export analytics as Excel
router.get('/analytics/export', protect, adminOnly, async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Analytics');

        worksheet.columns = [
            { header: 'Total Users', key: 'totalUsers', width: 15 },
            { header: 'Total Courses', key: 'totalCourses', width: 15 },
            { header: 'Total Enrollments', key: 'totalEnrollments', width: 18 }
        ];

        worksheet.addRow({
            totalUsers: await User.count(),
            totalCourses: await Course.count(),
            totalEnrollments: await Enrollment.count()
        });

        // Users sheet
        const usersSheet = workbook.addWorksheet('Users');
        usersSheet.columns = [
            { header: 'ID', key: 'id', width: 36 },
            { header: 'Username', key: 'username', width: 20 },
            { header: 'Email', key: 'email', width: 25 },
            { header: 'Role', key: 'role', width: 12 }
        ];
        users.forEach(u => usersSheet.addRow(u));

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="analytics.xlsx"');
        
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;