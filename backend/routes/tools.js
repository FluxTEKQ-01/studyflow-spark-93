
const express = require('express');
const router = express.Router();
const Email = require('../models/Email');
const User = require('../models/User');
const { verifyToken, checkCredits } = require('../middleware/auth');

// Generate an email
router.post('/email-generator', verifyToken, checkCredits, async (req, res) => {
  try {
    const { uid } = req.user;
    const { subject, recipient, purpose, content } = req.body;
    
    // Create new email entry
    const email = new Email({
      userId: uid,
      subject,
      recipient,
      purpose,
      content,
      tags: ['generated']
    });
    
    await email.save();
    
    // Deduct credits (skip for free tools)
    if (req.userDoc && req.body.toolCost > 0) {
      await User.findOneAndUpdate(
        { firebaseUid: uid },
        { $inc: { credits: -req.body.toolCost } }
      );
    }
    
    res.status(201).json({ 
      email, 
      message: 'Email generated successfully',
      creditsRemaining: req.userDoc.credits - (req.body.toolCost || 0)
    });
  } catch (error) {
    console.error('Error generating email:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's generated emails
router.get('/emails', verifyToken, async (req, res) => {
  try {
    const { uid } = req.user;
    const emails = await Email.find({ userId: uid }).sort({ createdAt: -1 });
    
    res.status(200).json({ emails });
  } catch (error) {
    console.error('Error getting emails:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// More tool routes will be added here

module.exports = router;
