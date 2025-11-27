const express = require('express');
const router = express.Router();
const { Pyq, User } = require('../models'); // FIX: Added User to imports
const { protect } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Configure Storage for PDFs
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') cb(null, true);
        else cb(new Error('Only PDF files are allowed!'), false);
    },
    limits: { fileSize: 10 * 1024 * 1024 } 
});

// @route   GET /api/pyq
// @desc    Get all papers (with filters)
router.get('/', async (req, res) => {
  try {
    const { year, semester, search } = req.query;
    const where = {};
    
    if (year && year !== 'All') where.year = year;
    if (semester && semester !== 'All') where.semester = semester;
    
    // Basic search implementation
    if (search) {
        const { Op } = require('sequelize');
        where[Op.or] = [
            { subject: { [Op.like]: `%${search}%` } },
            { subjectCode: { [Op.like]: `%${search}%` } }
        ];
    }

    const papers = await Pyq.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: papers });
  } catch (error) {
    console.error("Error fetching papers:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/pyq
// @desc    Upload a new paper (Admin Only)
router.post('/', protect, upload.single('pdfFile'), async (req, res) => {
  try {
    // FIX: Check for Admin privileges
    const user = await User.findByPk(req.user);
    if (!user || user.role !== 'Admin') {
        // Clean up file if uploaded but user is unauthorized
        if (req.file) fs.unlinkSync(req.file.path); 
        return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    console.log("File Upload Request:", req.file);
    console.log("Body Data:", req.body);

    const { subject, subjectCode, year, semester, type } = req.body;
    
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Please upload a PDF file" });
    }

    const newPyq = await Pyq.create({
      subject,
      subjectCode,
      year,
      semester,
      type,
      fileUrl: `/uploads/${req.file.filename}` 
    });

    res.status(201).json({ success: true, data: newPyq, message: "Paper uploaded successfully!" });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;