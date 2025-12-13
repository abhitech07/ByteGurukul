const express = require('express');
const router = express.Router();
const { Project, Order } = require('../models');
const { protect } = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');
const fs = require('fs');
const path = require('path');

// @route   GET /api/projects
// @desc    Get all projects (Public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/projects
// @desc    Create a new project (Admin Only)
router.post('/', protect, adminAuth, async (req, res) => {
  try {
    const { title, domain, price, description, technologies, features, difficulty, demoLink, sourceCodeUrl } = req.body;
    
    const newProject = await Project.create({
      title,
      domain,
      price,
      description,
      technologies,
      features,
      difficulty,
      demoLink,
      sourceCodeUrl
    });

    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/projects/:id/download
// @desc    Get download link (Protected - requires payment)
router.get('/:id/download', protect, async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // 1. Check if user bought this project
    const order = await Order.findOne({
      where: {
        userId: req.user,
        itemId: project.id,
        itemType: 'project',
        status: 'completed' // This status comes from Payment Gateway logic later
      }
    });

    // Bypass payment check ONLY if admin or price is 0
    // Note: For now, if you are testing without payments, you might want to comment out the 'order' check below.
    if (!order && project.price > 0) {
      return res.status(403).json({ success: false, message: "You must purchase this project first." });
    }

    // 2. Check if file exists
    if (!project.sourceCodeUrl) {
      return res.status(404).json({ success: false, message: "No file available for download" });
    }

    const filePath = path.join(__dirname, '../uploads/projects', project.sourceCodeUrl);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: "File not found" });
    }

    // 3. Stream the file securely
    const fileName = path.basename(filePath);
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    fileStream.on('error', (err) => {
      console.error('Error streaming file:', err);
      if (!res.headersSent) {
        res.status(500).json({ success: false, message: "Error reading file" });
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;