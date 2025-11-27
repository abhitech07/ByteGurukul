const express = require('express');
const router = express.Router();
const { Course, User, Enrollment } = require('../models');
const { protect } = require('../middleware/auth');


// @route GET /api/courses
// Get all courses with filters
router.get('/', async (req, res) => {
  try {
    const where = {};
    if (req.query.category) {
        where.category = req.query.category;
    }

    const courses = await Course.findAll({
        where,
        include: [{ model: User, as: 'instructor', attributes: ['username'] }] 
    });

    res.json({ success: true, data: courses, message: 'Courses fetched successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route GET /api/courses/:id
// Get single course by ID
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);

        if (course) {
            res.json({ success: true, data: course, message: 'Course fetched successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


// @route POST /api/courses
// Create new course 
router.post('/', protect, async (req, res) => {
    const { title, description, price } = req.body;
    
    try {
        // FIX: Check if user is authorized to create a course
        const user = await User.findByPk(req.user);
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        // Allow Instructors and Admins
        if (user.role !== 'Instructor' && user.role !== 'Admin') {
            return res.status(403).json({ success: false, message: 'Access denied. Instructors only.' });
        }

        const course = await Course.create({
            title,
            description,
            price,
            instructorId: req.user // Use the ID from the token
        });

        res.status(201).json({ success: true, data: course, message: 'Course created successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// @route POST /api/courses/:courseId/enroll
// Enroll in course
router.post('/:courseId/enroll', protect, async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user;

    try {
        // 1. Check if already enrolled
        const existingEnrollment = await Enrollment.findOne({ where: { courseId, userId } });
        if (existingEnrollment) {
            return res.status(400).json({ success: false, message: 'You are already enrolled in this course.' });
        }
        
        // 2. Create new enrollment
        const enrollment = await Enrollment.create({ courseId, userId });

        res.status(201).json({ success: true, data: enrollment, message: 'Successfully enrolled in the course.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;