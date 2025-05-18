
const admin = require('../config/firebase');

// Middleware to verify Firebase Auth token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token provided' });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to check user credits for paid tools
const checkCredits = async (req, res, next) => {
  try {
    const { uid } = req.user;
    const User = require('../models/User');
    const user = await User.findOne({ firebaseUid: uid });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get tool credit cost from request or params
    const toolCost = req.body.toolCost || req.params.toolCost || 1;
    
    if (user.credits < toolCost && req.body.toolId !== 'resume-scorer') {
      return res.status(403).json({ message: 'Insufficient credits' });
    }
    
    // Store user object for later use
    req.userDoc = user;
    next();
  } catch (error) {
    console.error('Error checking credits:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { verifyToken, checkCredits };
