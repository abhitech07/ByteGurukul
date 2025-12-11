const express = require('express');
const router = express.Router();
const { Certificate, Enrollment, Course, User } = require('../models');
const { protect } = require('../middleware/auth');
const PDFDocument = require('pdfkit');
const fs = require('node:fs');
const path = require('node:path');

// @route   GET /api/certificates/my-certificates
// @desc    Get all certificates earned by student
router.get('/my-certificates', protect, async (req, res) => {
    try {
        const certificates = await Certificate.findAll({
            where: { userId: req.user },
            include: [
                { model: Course, attributes: ['id', 'title', 'instructor'] },
                { model: User, attributes: ['id', 'name', 'email'] }
            ],
            order: [['issuedAt', 'DESC']]
        });

        res.json({ success: true, data: certificates });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   GET /api/certificates/:certificateId
// @desc    Get certificate details
router.get('/:certificateId', protect, async (req, res) => {
    try {
        const certificate = await Certificate.findByPk(req.params.certificateId, {
            include: [
                { model: Course, attributes: ['id', 'title', 'instructor', 'duration'] },
                { model: User, attributes: ['id', 'name', 'email'] }
            ]
        });

        if (!certificate) {
            return res.status(404).json({ success: false, message: "Certificate not found" });
        }

        // Verify ownership
        if (certificate.userId !== req.user) {
            return res.status(403).json({ success: false, message: "You don't have access to this certificate" });
        }

        res.json({ success: true, data: certificate });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   POST /api/certificates/generate
// @desc    Generate certificate for completed course
router.post('/generate', protect, async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user;

        // Verify enrollment
        const enrollment = await Enrollment.findOne({
            where: { userId, courseId }
        });

        if (!enrollment) {
            return res.status(400).json({ success: false, message: "You are not enrolled in this course" });
        }

        // Check if already issued
        const existingCert = await Certificate.findOne({
            where: { userId, courseId }
        });

        if (existingCert) {
            return res.status(400).json({ success: false, message: "Certificate already issued for this course" });
        }

        const course = await Course.findByPk(courseId);
        const user = await User.findByPk(userId);

        if (!course || !user) {
            return res.status(404).json({ success: false, message: "Course or User not found" });
        }

        // Generate certificate reference number
        const certificateNumber = `CERT-${Date.now()}-${userId}`;

        const certificate = await Certificate.create({
            userId,
            courseId,
            certificateNumber,
            issuedAt: new Date(),
            expiresAt: null // Certificates don't expire
        });

        res.status(201).json({ 
            success: true, 
            data: certificate, 
            message: "Certificate generated successfully" 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   GET /api/certificates/:certificateId/download
// @desc    Download certificate as PDF
router.get('/:certificateId/download', protect, async (req, res) => {
    try {
        const certificate = await Certificate.findByPk(req.params.certificateId, {
            include: [
                { model: Course, attributes: ['id', 'title', 'instructor'] },
                { model: User, attributes: ['id', 'name', 'email'] }
            ]
        });

        if (!certificate) {
            return res.status(404).json({ success: false, message: "Certificate not found" });
        }

        // Verify ownership
        if (certificate.userId !== req.user) {
            return res.status(403).json({ success: false, message: "You don't have access to this certificate" });
        }

        // Create PDF
        const doc = new PDFDocument({
            layout: 'landscape',
            size: 'A4'
        });

        const fileName = `Certificate-${certificate.certificateNumber}.pdf`;
        const filePath = path.join(__dirname, '../uploads', fileName);

        // Write stream
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // Certificate design
        doc.fontSize(40)
            .font('Helvetica-Bold')
            .text('CERTIFICATE OF COMPLETION', 50, 150, { align: 'center' });

        doc.fontSize(14)
            .font('Helvetica')
            .text('This is to certify that', 50, 230, { align: 'center' });

        doc.fontSize(24)
            .font('Helvetica-Bold')
            .text(certificate.User.name, 50, 260, { align: 'center' });

        doc.fontSize(14)
            .font('Helvetica')
            .text('has successfully completed the course', 50, 310, { align: 'center' });

        doc.fontSize(18)
            .font('Helvetica-Bold')
            .text(certificate.Course.title, 50, 340, { align: 'center' });

        doc.fontSize(12)
            .font('Helvetica')
            .text(`Certificate Number: ${certificate.certificateNumber}`, 50, 410, { align: 'center' });

        doc.text(`Issued Date: ${new Date(certificate.issuedAt).toLocaleDateString()}`, 50, 430, { align: 'center' });

        doc.fontSize(10)
            .text('ByteGurukul - Empowering Learners', 50, 550, { align: 'center' });

        doc.end();

        stream.on('finish', () => {
            res.download(filePath, fileName, (err) => {
                if (err) console.log(err);
                // Optionally delete file after download
                fs.unlinkSync(filePath);
            });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   GET /api/certificates/verify/:certificateId
// @desc    Verify a certificate (public endpoint)
router.get('/verify/:certificateId', async (req, res) => {
    try {
        const certificate = await Certificate.findByPk(req.params.certificateId, {
            include: [
                { model: Course, attributes: ['id', 'title'] },
                { model: User, attributes: ['id', 'name'] }
            ]
        });

        if (!certificate) {
            return res.status(404).json({ success: false, message: "Certificate not found" });
        }

        res.json({ 
            success: true, 
            data: {
                studentName: certificate.User.name,
                courseName: certificate.Course.title,
                certificateNumber: certificate.certificateNumber,
                issuedDate: certificate.issuedAt,
                isValid: true
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
