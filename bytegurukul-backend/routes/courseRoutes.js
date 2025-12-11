const express = require('express');
const router = express.Router();
const { Course, User, Enrollment, Certificate } = require('../models');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload'); // Pichle step mein banaya tha
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// @route GET /api/courses
// Get all courses
router.get('/', async (req, res) => {
  try {
    const where = {};
    if (req.query.category) where.category = req.query.category;

    const courses = await Course.findAll({
        where,
        include: [{ model: User, as: 'instructor', attributes: ['username', 'name'] }] 
    });

    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route POST /api/courses (Create Course with Image)
router.post('/', protect, upload.single('thumbnail'), async (req, res) => {
    try {
        // 1. Check Authorization
        const user = await User.findByPk(req.user);
        if (user.role.toLowerCase() !== 'instructor' && user.role.toLowerCase() !== 'admin')
             {
            return res.status(403).json({ message: 'Access denied. Instructors only.' });
        }

        // 2. Get Data from Body & File
        const { title, code, description, price, category, level, duration } = req.body;
        const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;

        // 3. Create Course
        const course = await Course.create({
            title,
            code,
            description,
            price,
            category,
            level,
            duration,
            thumbnail,
            instructorId: req.user
        });

        res.status(201).json({ success: true, data: course, message: 'Course created successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
});

// @route POST /api/courses/:courseId/enroll
router.post('/:courseId/enroll', protect, async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user;

        // Check if course exists
        const course = await Course.findByPk(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found.' });
        }

        const existing = await Enrollment.findOne({ where: { courseId, userId } });
        if (existing) {
            return res.status(400).json({ success: false, message: 'Already enrolled.' });
        }

        const enrollment = await Enrollment.create({ courseId, userId });
        res.status(201).json({ success: true, data: enrollment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route POST /api/courses/:courseId/complete
router.post('/:courseId/complete', protect, async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user;

        // Check if enrolled
        const enrollment = await Enrollment.findOne({ where: { courseId, userId } });
        if (!enrollment) {
            return res.status(400).json({ success: false, message: 'Not enrolled in this course.' });
        }

        // Check if already completed
        if (enrollment.completionDate) {
            return res.status(400).json({ success: false, message: 'Course already completed.' });
        }

        // Mark as completed
        enrollment.completionDate = new Date();
        await enrollment.save();

        // Get user and course details
        const user = await User.findByPk(userId);
        const course = await Course.findByPk(courseId, {
            include: [{ model: User, as: 'instructor', attributes: ['name'] }]
        });

        // Generate PDF certificate
        const doc = new PDFDocument();
        const certificatePath = path.join(__dirname, '../uploads', `certificate_${userId}_${courseId}.pdf`);
        doc.pipe(fs.createWriteStream(certificatePath));

        // Certificate content
        doc.fontSize(25).text('Certificate of Completion', { align: 'center' });
        doc.moveDown();
        doc.fontSize(18).text(`This is to certify that`, { align: 'center' });
        doc.moveDown();
        doc.fontSize(22).text(`${user.name}`, { align: 'center' });
        doc.moveDown();
        doc.fontSize(18).text(`has successfully completed the course`, { align: 'center' });
        doc.moveDown();
        doc.fontSize(20).text(`${course.title}`, { align: 'center' });
        doc.moveDown();
        doc.fontSize(16).text(`Issued on: ${new Date().toDateString()}`, { align: 'center' });
        doc.moveDown();
        doc.fontSize(16).text(`Instructor: ${course.instructor.name}`, { align: 'center' });

        doc.end();

        // Save certificate record
        const certificate = await Certificate.create({
            userId,
            courseId,
            certificateUrl: `/uploads/certificate_${userId}_${courseId}.pdf`
        });

        res.status(200).json({ success: true, data: certificate, message: 'Course completed and certificate generated.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get Instructor's Courses
router.get('/instructor/my-courses', protect, async (req, res) => {
    try {
        const courses = await Course.findAll({ where: { instructorId: req.user } });
        res.json({ success: true, data: courses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get Single Course
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id, {
             include: [{ model: User, as: 'instructor', attributes: ['name'] }]
        });
        if (course) res.json({ success: true, data: course });
        else res.status(404).json({ success: false, message: 'Course not found' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;