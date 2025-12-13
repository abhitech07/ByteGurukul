const express = require('express');
const router = express.Router();
const { User, Course, Enrollment } = require('../models');
const { protect } = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');

// Apply admin authentication to all routes
router.use(protect);
router.use(adminAuth);

// @route   GET /api/admin/users
// @desc    Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/courses
// @desc    Get all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [{
        model: User,
        as: 'instructor',
        attributes: ['name', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/stats
// @desc    Get admin statistics
router.get('/stats', async (req, res) => {
  try {
    const [userCount] = await User.sequelize.query('SELECT COUNT(*) as count FROM "Users"');
    const [courseCount] = await Course.sequelize.query('SELECT COUNT(*) as count FROM "Courses"');
    const [enrollmentCount] = await Enrollment.sequelize.query('SELECT COUNT(*) as count FROM "Enrollments"');

    res.json({
      success: true,
      data: {
        totalUsers: parseInt(userCount[0].count),
        totalCourses: parseInt(courseCount[0].count),
        totalEnrollments: parseInt(enrollmentCount[0].count)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/admin/users/:id
// @desc    Update user
router.put('/users/:id', async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role.toLowerCase();

    await user.save();
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
