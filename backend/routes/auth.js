const express = require('express');
const router = express.Router();
const admin = require('../config/firebase');
const User = require('../models/User');

// Register user in our database after Firebase authentication
router.post('/register', async (req, res) => {
  try {
    const { token, displayName } = req.body;
    
    // Verify the Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email } = decodedToken;
    
    // Check if user already exists
    let user = await User.findOne({ firebaseUid: uid });
    
    if (user) {
      // Update last login time
      user.lastLogin = new Date();
      await user.save();
      return res.status(200).json({ 
        user, 
        message: 'User already exists', 
        isNewUser: false 
      });
    }
    
    // Create new user in our database
    user = new User({
      firebaseUid: uid,
      displayName: displayName || 'New User',
      email,
      credits: 10, // Give 10 free credits to new users
      isNewUser: true
    });
    
    await user.save();
    
    console.log(`New user registered: ${displayName} (${email})`);
    res.status(201).json({ 
      user, 
      message: 'User registered successfully', 
      isNewUser: true 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Get current user data
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token provided' });
    }
    
    // Verify the Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid } = decodedToken;
    
    // Get user from database
    const user = await User.findOne({ firebaseUid: uid });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If this is the first login for a new user, keep isNewUser flag
    // It will be reset after the celebration is shown
    const isNewUser = user.isNewUser;
    
    res.status(200).json({ user, isNewUser });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

// Mark user as not new anymore (called after celebration)
router.post('/mark-not-new', async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token provided' });
    }
    
    // Verify the Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid } = decodedToken;
    
    // Update user in database
    const user = await User.findOneAndUpdate(
      { firebaseUid: uid },
      { isNewUser: false },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({ user, isNewUser: false });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

module.exports = router;
