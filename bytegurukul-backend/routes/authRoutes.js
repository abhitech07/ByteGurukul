const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    const isMatch = await bcrypt.compare(password, user.password);
    
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

    // 4. Sign Token
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'secret', 
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        console.log('[Login] Token generated successfully.');
        console.log(`------------------------------------------------`);
        res.json({
          success: true,
          token: "Bearer " + token,
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

        // FIX: Do NOT manually hash here. The User model 'beforeCreate' hook handles it.
        // Passing plain password to create.
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

// --- NEW ROUTES ADDED BELOW ---

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
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

        // Update password (Hooks in User model will hash this automatically)
        user.password = newPassword; 
        await user.save();

        res.json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;