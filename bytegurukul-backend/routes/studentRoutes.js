const express = require('express');
const router = express.Router();
const { Course, Enrollment, User } = require('../models'); 
const { protect } = require('../middleware/auth');
const crypto = require('node:crypto');
const { sendEmail, enrollmentEmail } = require('../utils/sendEmail');

// Razorpay Check
let razorpay = null;
try {
    const Razorpay = require('razorpay');
    if(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
        razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
    }
} catch (err) {
    console.error("Razorpay module not found or keys missing. Running in Mock Mode.", err.message);
}

// @route   GET /api/student/my-learnings
router.get('/my-learnings', protect, async (req, res) => {
    try {
        const enrollments = await Enrollment.findAll({ where: { userId: req.user } });
        if (!enrollments.length) return res.json({ success: true, data: [] });

        const courseIds = enrollments.map(e => e.courseId);
        const courses = await Course.findAll({ where: { id: courseIds } });

        res.json({ success: true, data: courses });
    } catch (error) {
        console.error('Error fetching learnings:', error.message);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route   POST /api/student/order/create
router.post('/order/create', protect, async (req, res) => {
    try {
        const { courseId } = req.body;
        const course = await Course.findByPk(courseId);
        
        if (!course) return res.status(404).json({ message: "Course not found" });

        const alreadyEnrolled = await Enrollment.findOne({
            where: { userId: req.user, courseId: courseId }
        });

        if (alreadyEnrolled) {
            return res.status(400).json({ message: "You are already enrolled" });
        }

        // --- MOCK MODE DETECTION ---
        if (!razorpay) {
            console.log("⚠️ Creating MOCK Order (No Razorpay Keys)");
            return res.json({
                success: true,
                order: {
                    id: "order_mock_" + Date.now(),
                    amount: course.price * 100,
                    currency: "INR",
                    isMock: true // Frontend uses this to skip Razorpay checkout
                }
            });
        }

        // --- REAL MODE ---
        const options = {
            amount: Number(course.price) * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);
        res.json({ success: true, order });

    } catch (error) {
        console.error("Order Error:", error);
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/student/order/verify
// Helper function to verify payment signature
const verifyPaymentSignature = (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
  if (razorpay_order_id && razorpay_order_id.startsWith('order_mock_')) {
    return true;
  }
  
  if (razorpay && process.env.RAZORPAY_KEY_SECRET) {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');
    return expectedSignature === razorpay_signature;
  }
  
  return false;
};

// Helper function to handle enrollment and email
const enrollAndNotify = async (userId, courseId) => {
  const [enrollment, created] = await Enrollment.findOrCreate({
    where: { userId, courseId },
    defaults: { enrollmentDate: new Date() }
  });

  if (created) {
    try {
      const user = await User.findByPk(userId);
      const course = await Course.findByPk(courseId);
      
      if (user && course) {
        const emailData = enrollmentEmail(user.name || user.email, course.title, courseId);
        await sendEmail({
          email: user.email,
          ...emailData
        });
      }
    } catch (emailError) {
      console.error("Email sending failed (non-critical):", emailError.message);
    }
  }

  return enrollment;
};

// @route   POST /api/student/order/verify
// @desc    Verify Razorpay payment and enroll student
router.post('/order/verify', protect, async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;

        if (!razorpay && !razorpay_order_id.startsWith('order_mock_')) {
            return res.status(500).json({ message: "Server configuration error: Cannot verify payment" });
        }

        const isAuthentic = verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);

        if (isAuthentic) {
            await enrollAndNotify(req.user, courseId);
            return res.json({ success: true, message: "Course Enrolled Successfully!" });
        } else {
            return res.status(400).json({ success: false, message: "Payment Verification Failed" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;