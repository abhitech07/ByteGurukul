const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log(`------------------------------------------------`);
  console.log(`[Login Attempt] Email: ${email}`);

  try {
    // 1. Check if user exists
    // We use checking for the email explicitly
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
    console.log(`[Debug] Hashed Password from DB: ${user.password.substring(0, 10)}...`);

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

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({
            username: email.split('@')[0] + Date.now(),
            name,
            email,
            password: hashedPassword,
            role: role || 'student',
            phone: '0000000000' 
        });

        res.json({ success: true, message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;