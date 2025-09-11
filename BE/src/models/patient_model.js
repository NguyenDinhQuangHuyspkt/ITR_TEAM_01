const mongoose = require('mongoose');
const { GENDER_ENUM } = require('../config/constant');

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  }
}, { _id: false });

const patientSchema = new mongoose.Schema({ 
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
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
  },
  physician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Physician',
    required: true
  },
  addressInfo: {
    type: addressSchema,
    required: true
  }
}, {
  timestamps: true
});

// Index for pagination
patientSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Patient', patientSchema);