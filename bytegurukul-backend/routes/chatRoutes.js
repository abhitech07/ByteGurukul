const express = require('express');
const router = express.Router();
const { Chat, User } = require('../models');
const { protect } = require('../middleware/auth');

// @route   GET /api/chat/history
// @desc    Get chat history for the logged-in user
router.get('/history', protect, async (req, res) => {
  try {
    const chats = await Chat.findAll({
      where: { userId: req.user },
      order: [['createdAt', 'ASC']],
      include: [{ model: User, attributes: ['name'] }]
    });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/chat/send
// @desc    Send a new chat message
router.post('/send', protect, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Message text is required' });
    }

    // For now, assume student is sending to recruiter
    // In a real app, you'd determine the recipient based on context
    const newMessage = await Chat.create({
      sender: 'student',
      text: text.trim(),
      userId: req.user
    });

    res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
