const express = require('express');
const router = express.Router();
const { Application, Task, Submission, User } = require('../models');
const { protect } = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { sendEmail, internshipOfferEmail } = require('../utils/sendEmail');

// --- APPLICATION ROUTES (Existing) ---

// @route   POST /api/internship/apply
// @desc    Submit internship application
router.post('/apply', protect, async (req, res) => {
  try {
    const { name, email, phone, university, resumeText, roleId } = req.body;
    
    // Validation
    if (!name || !email || !phone || !roleId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Check if already applied
    const existing = await Application.findOne({
      where: { email, roleId }
    });

    if (existing && existing.status !== 'rejected') {
      return res.status(400).json({ success: false, message: "You have already applied for this role" });
    }

    const newApp = await Application.create({
      userId: req.user,
      name,
      email,
      phone,
      university,
      resumeText,
      roleId,
      status: 'pending',
      appliedAt: new Date()
    });

    res.status(201).json({ success: true, message: "Applied successfully!", data: newApp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/internship/all
// @desc    Get all applications (public)
router.get('/all', async (req, res) => {
    try {
        const apps = await Application.findAll({
            order: [['createdAt', 'DESC']],
            include: [{ model: User, attributes: ['id', 'name', 'email'] }]
        });
        res.json({ success: true, data: apps });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/internship/my-applications
// @desc    Get logged-in student's applications
router.get('/my-applications', protect, async (req, res) => {
    try {
        const apps = await Application.findAll({
            where: { userId: req.user },
            order: [['createdAt', 'DESC']]
        });
        res.json({ success: true, data: apps });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/internship/applications/:appId/approve
// @desc    Approve application (Admin only)
router.put('/applications/:appId/approve', protect, adminAuth, async (req, res) => {
    try {
        const application = await Application.findByPk(req.params.appId);
        
        if (!application) {
            return res.status(404).json({ success: false, message: "Application not found" });
        }

        application.status = 'approved';
        application.approvedAt = new Date();
        await application.save();

        res.json({ success: true, message: "Application approved", data: application });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/internship/applications/:appId/reject
// @desc    Reject application (Admin only)
router.put('/applications/:appId/reject', protect, adminAuth, async (req, res) => {
    try {
        const { reason } = req.body;
        const application = await Application.findByPk(req.params.appId);
        
        if (!application) {
            return res.status(404).json({ success: false, message: "Application not found" });
        }

        application.status = 'rejected';
        application.rejectionReason = reason || null;
        application.rejectedAt = new Date();
        await application.save();

        res.json({ success: true, message: "Application rejected", data: application });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- NEW TASK & SUBMISSION ROUTES ---

// @route   GET /api/internship/tasks
// @desc    Get tasks (Optional: Filter by user role)
router.get('/tasks', protect, async (req, res) => {
    try {
        // In future: Filter by req.user.role if needed
        const tasks = await Task.findAll();
        res.json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/internship/tasks
// @desc    Create a new task (Admin Only)
router.post('/tasks', protect, async (req, res) => {
    try {
        const { title, description, role, deadline } = req.body;
        const task = await Task.create({ title, description, role, deadline });
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/internship/task/submit
// @desc    Submit a task solution
router.post('/task/submit', protect, async (req, res) => {
    try {
        const { taskId, githubLink, liveLink } = req.body;

        // Check if already submitted
        const existing = await Submission.findOne({ 
            where: { studentId: req.user, taskId } 
        });
        
        if (existing) {
            return res.status(400).json({ message: "You have already submitted this task." });
        }

        const submission = await Submission.create({
            studentId: req.user,
            taskId,
            githubLink,
            liveLink
        });

        res.status(201).json({ success: true, message: "Task submitted successfully!", data: submission });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/internship/my-submissions
// @desc    Get logged in user's submissions
router.get('/my-submissions', protect, async (req, res) => {
    try {
        const subs = await Submission.findAll({ 
            where: { studentId: req.user },
            include: [{ model: Task }] 
        });
        res.json({ success: true, data: subs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;