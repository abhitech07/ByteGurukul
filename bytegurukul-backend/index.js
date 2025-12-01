require('dotenv').config(); // Must be at the very top
const express = require('express');
const cors = require('cors');
const path = require('path'); 
const { sequelize } = require('./models'); 
const passport = require('passport'); 

// Import Config (Passport Strategy)
require('./config/passport'); 

// Import Routes
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const internshipRoutes = require('./routes/internshipRoutes'); 
const pyqRoutes = require('./routes/pyqRoutes'); 
// const studentRoutes = require('./routes/studentRoutes'); // Uncomment if you have this file

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Initialize Passport
app.use(passport.initialize());

// Serve Static Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// Basic Test Route
app.get('/api', (req, res) => {
  res.send('ByteGurukul Backend is Running!');
});

// Mount API routes
app.use('/api/auth', authRoutes);     
app.use('/api/courses', courseRoutes); 
app.use('/api/internship', internshipRoutes); 
app.use('/api/pyq', pyqRoutes); 
// app.use('/api/student', studentRoutes); // Uncomment if needed

// Start Server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.sync({ force: true });
    console.log('Database synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});