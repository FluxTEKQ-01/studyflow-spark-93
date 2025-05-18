
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  credits: {
    type: Number,
    default: 10
  },
  subscription: {
    type: String,
    enum: ['free', 'basic', 'premium', 'enterprise'],
    default: 'free'
  },
  recentTools: [{
    toolId: String,
    usedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isNewUser: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
