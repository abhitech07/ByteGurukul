const Razorpay = require('razorpay');
const crypto = require('crypto');
const { Order, Project, Course, User } = require('../models');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @desc    Create a new order (Razorpay)
// @route   POST /api/payments/create-order
exports.createOrder = async (req, res) => {
  try {
    const { itemId, itemType } = req.body; // itemType: 'course' or 'project'
    const userId = req.user.id;

    let item;
    if (itemType === 'project') {
      item = await Project.findByPk(itemId);
    } else {
      item = await Course.findByPk(itemId);
    }

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Amount must be in Paisa (INR * 100)
    const amount = item.price * 100;
    const currency = 'INR';

    const options = {
      amount: amount.toString(),
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1 // Auto capture
    };

    // Create Order on Razorpay
    const order = await razorpay.orders.create(options);

    // Save to Database
    const newOrder = await Order.create({
      userId,
      courseId: itemType === 'course' ? itemId : null,
      projectId: itemType === 'project' ? itemId : null,
      orderId: order.id,
      amount: item.price,
      currency: 'INR',
      status: 'created',
      isMock: false,
      paymentDetails: JSON.stringify(order)
    });

    res.json({
      success: true,
      orderId: order.id,
      amount: amount,
      currency: currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      dbOrderId: newOrder.id
    });

  } catch (error) {
    console.error('Razorpay Error:', error);
    res.status(500).json({ message: 'Payment initiation failed', error: error.message });
  }
};

// @desc    Verify Payment Signature
// @route   POST /api/payments/verify
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, dbOrderId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Payment Success!
      
      // 1. Update Order Status
      const order = await Order.findByPk(dbOrderId);
      if (order) {
        order.status = 'paid';
        order.paymentDetails = { razorpay_payment_id };
        await order.save();
      }

      // 2. Enroll User (Unlock Content)
      // Add logic here to add entry to "Enrollments" or "PurchasedProjects" table
      
      res.json({ success: true, message: "Payment Verified Successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid Signature" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Handle Razorpay Webhook
// @route   POST /api/payments/webhook
exports.handleWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];
    const body = JSON.stringify(req.body);

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    const event = req.body.event;
    const paymentEntity = req.body.payload.payment.entity;

    if (event === 'payment.captured') {
      // Payment was successful
      const razorpayOrderId = paymentEntity.order_id;

      // Find and update the order
      const order = await Order.findOne({ where: { orderId: razorpayOrderId } });
      if (order) {
        order.status = 'paid';
        order.paymentDetails = paymentEntity;
        await order.save();
      }
    }

    res.json({ status: 'ok' });

  } catch (error) {
    console.error('Webhook Error:', error);
    res.status(500).json({ message: 'Webhook processing failed' });
  }
};
