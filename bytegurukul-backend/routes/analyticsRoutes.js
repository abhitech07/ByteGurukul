const express = require('express');
const router = express.Router();
const { User, Course, Enrollment, Submission, Review, Task } = require('../models');
const { protect } = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');
const { Op } = require('sequelize');

// @route   GET /api/analytics/instructor/dashboard
// @desc    Get instructor's course analytics
router.get('/instructor/dashboard', protect, async (req, res) => {
    try {
        const userId = req.user;

        // Get instructor's courses
        const courses = await Course.findAll({
            where: { instructorId: userId }
        });

        if (courses.length === 0) {
            return res.json({
                success: true,
                data: {
                    totalCourses: 0,
                    totalEnrollments: 0,
                    totalRevenue: 0,
                    averageRating: 0,
                    courses: []
                }
            });
        }

        const courseIds = courses.map(c => c.id);

        // Get enrollments
        const enrollments = await Enrollment.findAll({
            where: { courseId: courseIds }
        });

        // Get reviews
        const reviews = await Review.findAll({
            where: { courseId: courseIds }
        });

        const totalRevenue = enrollments.length * 500; // Assuming avg price is 500
        const avgRating = reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2)
            : 0;

        const courseStats = courses.map(course => ({
            courseId: course.id,
            title: course.title,
            enrollments: enrollments.filter(e => e.courseId === course.id).length,
            revenue: enrollments.filter(e => e.courseId === course.id).length * 500,
            rating: (reviews.filter(r => r.courseId === course.id)
                .reduce((sum, r) => sum + r.rating, 0) / (reviews.filter(r => r.courseId === course.id).length || 1)).toFixed(2)
        }));

        res.json({
            success: true,
            data: {
                totalCourses: courses.length,
                totalEnrollments: enrollments.length,
                totalRevenue,
                averageRating: avgRating,
                courses: courseStats
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   GET /api/analytics/course/:courseId
// @desc    Get detailed analytics for a specific course
router.get('/course/:courseId', protect, async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findByPk(courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        // Verify instructor ownership
        if (course.instructorId !== req.user) {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }

        // Get enrollments
        const enrollments = await Enrollment.findAll({
            where: { courseId },
            include: [{ model: User, attributes: ['id', 'name', 'email'] }]
        });

        // Get reviews
        const reviews = await Review.findAll({
            where: { courseId }
        });

        const avgRating = reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2)
            : 0;

        res.json({
            success: true,
            data: {
                courseId,
                courseTitle: course.title,
                totalEnrollments: enrollments.length,
                totalReviews: reviews.length,
                averageRating: avgRating,
                revenue: enrollments.length * 500,
                students: enrollments.map(e => ({
                    studentId: e.User.id,
                    name: e.User.name,
                    email: e.User.email,
                    enrolledAt: e.enrollmentDate
                }))
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   GET /api/analytics/admin/dashboard
// @desc    Get admin dashboard analytics (Admin only)
router.get('/admin/dashboard', protect, adminAuth, async (req, res) => {
    try {
        // Get user stats
        const totalUsers = await User.count();
        const studentCount = await User.count({ where: { role: 'student' } });
        const instructorCount = await User.count({ where: { role: 'instructor' } });

        // Get course stats
        const totalCourses = await Course.count();
        const totalEnrollments = await Enrollment.count();

        // Get revenue
        const totalRevenue = totalEnrollments * 500;

        // Recent enrollments (last 7 days)
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const recentEnrollments = await Enrollment.count({
            where: { enrollmentDate: { [Op.gte]: sevenDaysAgo } }
        });

        res.json({
            success: true,
            data: {
                totalUsers,
                studentCount,
                instructorCount,
                totalCourses,
                totalEnrollments,
                totalRevenue,
                recentEnrollments7Days: recentEnrollments
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   GET /api/analytics/student/progress
// @desc    Get student's learning analytics
router.get('/student/progress', protect, async (req, res) => {
    try {
        const userId = req.user;

        // Get enrolled courses
        const enrollments = await Enrollment.findAll({
            where: { userId },
            include: [{ model: Course }]
        });

        // Get submissions
        const submissions = await Submission.findAll({
            where: { studentId: userId }
        });

        const courseProgress = enrollments.map(enrollment => ({
            courseId: enrollment.Course.id,
            courseName: enrollment.Course.title,
            enrolledAt: enrollment.enrollmentDate
        }));

        res.json({
            success: true,
            data: {
                totalCoursesEnrolled: enrollments.length,
                totalSubmissions: submissions.length,
                courses: courseProgress
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
