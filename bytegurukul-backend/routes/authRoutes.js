const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport'); // ✅ Added Passport import
const { User } = require('../models');
const { protect } = require('../middleware/auth'); // Imported middleware

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log(`------------------------------------------------`);
  console.log(`[Login Attempt] Email: ${email}`);

  try {
    // 1. Check if user exists
    const user = await User.findOne({ 
        where: { email }
    });
    
    if (!user) {
      console.log('[Login Failed] User not found in database.');
      return res.status(400).json({ success: false, message: "User not found with this email" });
    }

    // DEBUGGING: Check if we actually got a password hash
    if (!user.password) {
        console.log('❌ [CRITICAL ERROR] Password field is NULL or undefined. Check your User Model scopes.');
        return res.status(500).json({ success: false, message: "Server Error: Password field missing." });
    }

    console.log(`[Login Found] User: ${user.username} (Role: ${user.role})`);
    
    // 2. Validate Password
    const isMatch = await user.validPassword(password);
    
    if (!isMatch) {
      console.log('❌ [Login Failed] Password hash did not match.');
      return res.status(400).json({ success: false, message: "Invalid credentials (password mismatch)" });
    }

    console.log('✅ [Login Success] Credentials matched.');

    // 3. Create JWT Payload
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    // CRITICAL SECURITY FIX: Ensure JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
        console.error("FATAL ERROR: JWT_SECRET is not defined in .env file.");
        return res.status(500).json({ success: false, message: "Server Configuration Error" });
    }

    // 4. Sign Token
    jwt.sign(
      payload,
      process.env.JWT_SECRET, 
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        console.log('[Login] Token generated successfully.');
        console.log(`------------------------------------------------`);
        res.json({
          success: true,
          token: token, // ✅ Fixed: Sending raw token (Frontend adds "Bearer" if needed)
          user: payload
        });
      }
    );

  } catch (error) {
    console.error('[Login Error]', error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// @route   POST /api/auth/signup
// @desc    Register new user
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        let user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Password hashing handled by Sequelize Hooks in User model
        user = await User.create({
            username: email.split('@')[0] + Date.now(),
            name,
            email,
            password: password, 
            role: role || 'student',
            phone: '0000000000' 
        });

        res.json({ success: true, message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET /api/auth/me
// @desc    Get current logged in user details
router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findByPk(req.user, {
            attributes: { exclude: ['password'] }
        });
        res.json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// @route   PUT /api/auth/update-profile
// @desc    Update user details
router.put('/update-profile', protect, async (req, res) => {
    try {
        const { name, phone } = req.body;
        const user = await User.findByPk(req.user);

        if (name) user.name = name;
        if (phone) user.phone = phone;
        
        await user.save();
        res.json({ success: true, message: "Profile updated", data: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/auth/change-password
// @desc    Change Password
router.put('/change-password', protect, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findByPk(req.user);

        // Validate Current Password
        const isMatch = await user.validPassword(currentPassword);
        if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

        // Update password (Hooks in User model will hash this automatically)
        user.password = newPassword; 
        await user.save();

        res.json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- SOCIAL LOGIN ROUTES (ADDED) ---

// @route   GET /api/auth/google
// @desc    Redirect to Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @route   GET /api/auth/google/callback
// @desc    Google callback
router.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const user = req.user;
    // Generate JWT
    const payload = { id: user.id, name: user.name, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
    
    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/auth-success?token=${token}`);
  }
);

// @route   GET /api/auth/github
// @desc    Redirect to GitHub
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// @route   GET /api/auth/github/callback
// @desc    GitHub callback
router.get('/github/callback', 
  passport.authenticate('github', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const user = req.user;
    const payload = { id: user.id, name: user.name, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });

    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/auth-success?token=${token}`);
  }
);

module.exports = router;