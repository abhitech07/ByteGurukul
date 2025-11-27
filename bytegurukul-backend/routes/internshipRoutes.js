const express = require('express');
const router = express.Router();
const { Application } = require('../models');
const { protect } = require('../middleware/auth'); // Imported middleware

// @route   POST /api/internship/apply
// @desc    Submit a new internship application
router.post('/apply', async (req, res) => {
  try {
    const { name, email, phone, university, resumeText, roleId } = req.body;

    // Basic Validation
    if (!name || !email || !phone || !roleId) {
      return res.status(400).json({ success: false, message: "Please fill in all required fields." });
    }

    // Create new entry in database
    const newApplication = await Application.create({
      name,
      email,
      phone,
      university,
      resumeText,
      roleId
    });

    res.status(201).json({ 
        success: true, 
        message: "Application submitted successfully!", 
        data: newApplication 
    });

  } catch (error) {
    console.error("Application Error:", error);
    res.status(500).json({ success: false, message: "Server Error. Please try again later." });
  }
});

// @route   GET /api/internship/all
// @desc    Get all applications (For Admin Dashboard)
router.get('/all', async (req, res) => {
    try {
        // Fetch all, ordered by newest first
        const applications = await Application.findAll({ order: [['createdAt', 'DESC']] });
        res.json({ success: true, data: applications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   GET /api/internship/student/:email
// @desc    Get all applications for a specific student email
router.get('/student/:email', async (req, res) => {
    try {
        const { email } = req.params;
        // Fetch applications matching the email
        const applications = await Application.findAll({ 
            where: { email },
            order: [['createdAt', 'DESC']] 
        });
        res.json({ success: true, data: applications });
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch applications" });
    }
});

// @route   POST /api/internship/schedule
// @desc    Schedule an interview for an application (NEW)
router.post('/schedule', async (req, res) => {
    try {
        const { applicationId, date, type } = req.body;

        // Handle format if frontend sends "APP-1" or just "1"
        const id = applicationId.toString().replace('APP-', '');

        const app = await Application.findByPk(id);

        if (!app) {
            return res.status(404).json({ success: false, message: "Application not found" });
        }

        // Update Application fields
        app.interviewDate = date;
        app.interviewType = type || 'General Round';
        app.status = 'Interview Scheduled'; 
        app.interviewLink = 'https://meet.google.com/abc-defg-hij'; // Mock link
        
        await app.save();

        res.json({ 
            success: true, 
            message: "Interview scheduled successfully!", 
            data: app 
        });

    } catch (error) {
        console.error("Scheduling Error:", error);
        res.status(500).json({ success: false, message: "Failed to schedule interview" });
    }
});

// @route   PUT /api/internship/:id/status
// @desc    Update status (e.g., Approve/Reject)
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const app = await Application.findByPk(req.params.id);
        
        if (!app) return res.status(404).json({ message: "Application not found" });

        app.status = status;
        await app.save();

        res.json({ success: true, data: app });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// --- NEW ROUTES ADDED BELOW ---

// @route   GET /api/internship/tasks
// @desc    Get assigned tasks for student
router.get('/tasks', protect, async (req, res) => {
    // Mock Data - In a real app, fetch from a 'Tasks' table based on user role/id
    const tasks = [
        { id: 1, title: "Frontend UI Design", status: "Pending", deadline: "2023-11-01" },
        { id: 2, title: "API Integration", status: "Completed", deadline: "2023-10-25" }
    ];
    res.json({ success: true, data: tasks });
});

// @route   POST /api/internship/task/submit
// @desc    Submit a task solution
router.post('/task/submit', protect, async (req, res) => {
    const { taskId, githubLink } = req.body;
    // Logic to save submission to DB would go here
    res.json({ success: true, message: "Task submitted successfully" });
});

module.exports = router;