const express = require('express');
const router = express.Router();
const { Course, Enrollment } = require('../models');
const { protect } = require('../middleware/auth');

// @route   GET /api/student/my-learnings
// @desc    Get enrolled courses
router.get('/my-learnings', protect, async (req, res) => {
    try {
        // Fetch enrollments along with Course details
        const enrollments = await Enrollment.findAll({
            where: { userId: req.user },
            // Note: Iske liye models/index.js mein associations set honi chahiye
            // Enrollment.belongsTo(Course)
            // include: [{ model: Course }] 
        });

        // Agar associations set nahi hain toh manual fetch (Temporary fix):
        const courseIds = enrollments.map(e => e.courseId);
        const courses = await Course.findAll({ where: { id: courseIds } });

        res.json({ success: true, data: courses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/student/order/create
// @desc    Create Razorpay Order (Dummy implementation)
router.post('/order/create', protect, async (req, res) => {
    try {
        const { amount } = req.body;
        // Yahan Razorpay instance use karke order create karte hain
        // const order = await razorpay.orders.create({ ... })
        
        const dummyOrder = {
            id: "order_" + Date.now(),
            amount: amount * 100,
            currency: "INR"
        };
        
        res.json({ success: true, order: dummyOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/student/certificates
// @desc    Get list of certificates
router.get('/certificates', protect, async (req, res) => {
    // Mock Data - Real project mein "Certificate" model hoga
    const certificates = [
        { id: 1, courseName: "Full Stack Web Dev", date: "2023-10-12", url: "/certs/1.pdf" }
    ];
    res.json({ success: true, data: certificates });
});

module.exports = router;