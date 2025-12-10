const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
// FIXED: Use path.resolve/join to ensure absolute path consistency
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // FIXED: Use the absolute path variable defined above
    cb(null, uploadDir); 
  },
  filename: function (req, file, cb) {
    // File ka naam unique banayein
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  }
});

// File Filter (Sirf PDF allow karein)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = upload;