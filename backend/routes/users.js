
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const { uid } = req.user;
    const user = await User.findOne({ firebaseUid: uid });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { uid } = req.user;
    const { displayName } = req.body;
    
    const user = await User.findOneAndUpdate(
      { firebaseUid: uid },
      { $set: { displayName } },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({ user, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add credits to user account
router.post('/credits', verifyToken, async (req, res) => {
  try {
    const { uid } = req.user;
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid credit amount' });
    }
    
    const user = await User.findOneAndUpdate(
      { firebaseUid: uid },
      { $inc: { credits: amount } },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({ 
      user, 
      message: `${amount} credits added successfully` 
    });
  } catch (error) {
    console.error('Error adding credits:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
