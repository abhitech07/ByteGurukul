const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // Import Multer
const { Pyq } = require('../models'); // Import Model
const { protect } = require('../middleware/auth'); // Sirf logged in users ke liye (optional)

// @route   POST /api/pyq
// @desc    Upload a new PYQ
// @access  Admin/Instructor
router.post('/', upload.single('file'), async (req, res) => {
  try {
    console.log("File Uploaded:", req.file);
    console.log("Body Data:", req.body);

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { subject, year, branch, semester } = req.body;

    // Create Database Entry
    const newPyq = await Pyq.create({
      subject,
      year,
      branch,
      semester,
      filename: req.file.filename,
      filePath: `/uploads/${req.file.filename}` // Frontend access path
    });

    res.status(201).json({ 
        success: true, 
        message: 'PYQ uploaded successfully!', 
        data: newPyq 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   GET /api/pyq
// @desc    Get all PYQs
router.get('/', async (req, res) => {
    try {
        const pyqs = await Pyq.findAll({ order: [['createdAt', 'DESC']] });
        res.json({ success: true, data: pyqs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/pyq/:id
// @desc    Delete a PYQ
router.delete('/:id', protect, async (req, res) => {
    try {
        const pyq = await Pyq.findByPk(req.params.id);
        if (!pyq) return res.status(404).json({ message: "Paper not found" });

        // Optional: Delete file from server folder too (fs.unlink)
        
        await pyq.destroy();
        res.json({ success: true, message: "Paper deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;