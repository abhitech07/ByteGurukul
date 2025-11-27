const express = require('express');
const router = express.Router();
const { Application, Task, Submission, User } = require('../models');
const { protect } = require('../middleware/auth');

// --- APPLICATION ROUTES (Existing) ---

router.post('/apply', async (req, res) => {
  try {
    const { name, email, phone, university, resumeText, roleId } = req.body;
    if (!name || !email || !phone || !roleId) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }
    const newApp = await Application.create({ name, email, phone, university, resumeText, roleId });
    res.status(201).json({ success: true, message: "Applied successfully!", data: newApp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/all', async (req, res) => {
    const apps = await Application.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: apps });
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