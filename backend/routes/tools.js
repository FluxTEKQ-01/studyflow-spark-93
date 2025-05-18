
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
        { 
          $inc: { credits: -req.body.toolCost },
          $push: { recentTools: { toolId: 'email-generator' } }
        }
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

// Resume Scorer - Free tool
router.post('/resume-scorer', verifyToken, async (req, res) => {
  try {
    const { uid } = req.user;
    const { resumeText } = req.body;
    
    // Sample scoring logic - in real app, you'd use NLP/AI here
    const score = Math.floor(Math.random() * 40) + 60; // Random score between 60-100
    const feedback = {
      score,
      strengths: [
        'Clear professional summary',
        'Good keyword usage',
        'Well-structured format'
      ],
      weaknesses: [
        'Could improve action verbs',
        'Consider adding more quantifiable achievements',
        'Skills section could be expanded'
      ],
      suggestions: [
        'Add more industry-specific keywords',
        'Quantify your achievements with metrics',
        'Tailor your resume for each job application'
      ]
    };
    
    // Update user's recent tools
    await User.findOneAndUpdate(
      { firebaseUid: uid },
      { $push: { recentTools: { toolId: 'resume-scorer' } } }
    );
    
    res.status(200).json({
      feedback,
      message: 'Resume analyzed successfully'
    });
  } catch (error) {
    console.error('Error analyzing resume:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Interview Questions Generator
router.post('/interview-questions', verifyToken, checkCredits, async (req, res) => {
  try {
    const { uid } = req.user;
    const { role, experience, industry, count = 5 } = req.body;
    
    // Sample questions - in real app, you'd use LLM/AI here
    const baseQuestions = [
      { question: "Tell me about yourself and your experience in this field.", type: "introduction" },
      { question: "What are your greatest professional strengths?", type: "strengths" },
      { question: "Describe a challenging problem you solved recently.", type: "problem-solving" },
      { question: "Why do you want to work for our company?", type: "motivation" },
      { question: "Where do you see yourself in 5 years?", type: "career-goals" },
      { question: "Describe your ideal work environment.", type: "fit" },
      { question: "How do you handle stress and pressure?", type: "stress-management" },
      { question: "Tell me about a time you failed and what you learned.", type: "failure" },
      { question: "What questions do you have for me?", type: "closing" },
      { question: "How would you improve our product/service?", type: "company-specific" }
    ];
    
    // Select random questions based on count
    const questions = baseQuestions
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
    
    // Deduct credits and update recent tools
    if (req.userDoc && req.body.toolCost > 0) {
      await User.findOneAndUpdate(
        { firebaseUid: uid },
        { 
          $inc: { credits: -req.body.toolCost },
          $push: { recentTools: { toolId: 'interview-questions' } }
        }
      );
    }
    
    res.status(200).json({
      questions,
      message: 'Interview questions generated successfully',
      creditsRemaining: req.userDoc.credits - (req.body.toolCost || 0)
    });
  } catch (error) {
    console.error('Error generating interview questions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Project Documentation Generator
router.post('/project-documentation', verifyToken, checkCredits, async (req, res) => {
  try {
    const { uid } = req.user;
    const { projectName, description, technologies, features } = req.body;
    
    // Create documentation template
    const documentation = {
      readme: `# ${projectName}\n\n${description}\n\n## Technologies\n${technologies.map(tech => `- ${tech}`).join('\n')}\n\n## Features\n${features.map(feature => `- ${feature}`).join('\n')}\n\n## Installation\n\n\`\`\`bash\nnpm install\n\`\`\`\n\n## Usage\n\n\`\`\`bash\nnpm start\n\`\`\``,
      apiDocs: `# API Documentation for ${projectName}\n\n## Endpoints\n\n- GET /api\n- POST /api/resource\n- PUT /api/resource/:id\n- DELETE /api/resource/:id`,
      userGuide: `# User Guide for ${projectName}\n\n## Getting Started\n\n1. Install the application\n2. Configure your settings\n3. Start using the app`
    };
    
    // Deduct credits and update recent tools
    if (req.userDoc && req.body.toolCost > 0) {
      await User.findOneAndUpdate(
        { firebaseUid: uid },
        { 
          $inc: { credits: -req.body.toolCost },
          $push: { recentTools: { toolId: 'project-documentation' } }
        }
      );
    }
    
    res.status(200).json({
      documentation,
      message: 'Documentation generated successfully',
      creditsRemaining: req.userDoc.credits - (req.body.toolCost || 0)
    });
  } catch (error) {
    console.error('Error generating documentation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// SOP and Recommendation Letter Generator
router.post('/sop-letter-generator', verifyToken, checkCredits, async (req, res) => {
  try {
    const { uid } = req.user;
    const { type, name, institution, program, achievements, goals } = req.body;
    
    let content = '';
    
    if (type === 'sop') {
      content = `Statement of Purpose\n\nDear Admissions Committee of ${institution},\n\nI am writing to express my interest in the ${program} program. With my background in [field] and achievements including ${achievements.join(', ')}, I am excited about the opportunity to further my education at your prestigious institution.\n\nMy academic and professional journey has prepared me for this next step, where I aim to ${goals.join(' and ')}.\n\nSincerely,\n${name}`;
    } else {
      content = `Letter of Recommendation\n\nDear Admissions Committee,\n\nI am writing to highly recommend ${name} for the ${program} program at ${institution}. As [relationship], I have had the privilege of witnessing their exceptional abilities and achievements, including ${achievements.join(', ')}.\n\n${name} has consistently demonstrated the qualities necessary to excel in your program and achieve their goals to ${goals.join(' and ')}.\n\nSincerely,\n[Recommender Name]\n[Recommender Title]`;
    }
    
    // Deduct credits and update recent tools
    if (req.userDoc && req.body.toolCost > 0) {
      await User.findOneAndUpdate(
        { firebaseUid: uid },
        { 
          $inc: { credits: -req.body.toolCost },
          $push: { recentTools: { toolId: 'sop-letter-generator' } }
        }
      );
    }
    
    res.status(200).json({
      content,
      message: `${type === 'sop' ? 'Statement of Purpose' : 'Recommendation Letter'} generated successfully`,
      creditsRemaining: req.userDoc.credits - (req.body.toolCost || 0)
    });
  } catch (error) {
    console.error('Error generating letter:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
