const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  jobs: [{
    companyName: {
      type: String,
      required: true,
    },
    jobRole: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
    jobStatus: {
      type: String,
      enum: ['applied', 'interviewing', 'offered', 'rejected'], // Define allowed values
      required: true,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
