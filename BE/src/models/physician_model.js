const mongoose = require('mongoose');
const { GENDER_ENUM } = require('../config/constant');

const physicianSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  title: {
    type: String,
    required: true,
    trim: true
  },

  phone: {
    type: String,
    required: true,
    trim: true
  },

  gender: {
    type: String,
    enum: Object.values(GENDER_ENUM),
    required: true
  },

  dob: {
    type: String,
    required: true,
    match: /^\d{4}-\d{2}-\d{2}$/
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Physician', physicianSchema);