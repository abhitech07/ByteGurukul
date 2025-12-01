const express = require('express');
const router = express.Router();
const { Lecture, Course } = require('../models');
const { protect } = require('../middleware/auth');

// @route   GET /api/lectures/course/:courseId
// @desc    Get all lectures for a specific course
router.get('/course/:courseId', protect, async (req, res) => {
    try {
        const lectures = await Lecture.findAll({
            where: { courseId: req.params.courseId },
            order: [['order', 'ASC']]
        });
        res.json({ success: true, data: lectures });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/lectures
// @desc    Add a new lecture (Instructor/Admin only)
router.post('/', protect, async (req, res) => {
    try {
        const { title, videoUrl, description, courseId, order } = req.body;
        
        // Validation: Check if course exists
        const course = await Course.findByPk(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        const newLecture = await Lecture.create({
            title, videoUrl, description, courseId, order
        });

        res.status(201).json({ success: true, data: newLecture });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;