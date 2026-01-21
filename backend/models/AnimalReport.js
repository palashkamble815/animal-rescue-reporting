//AnimalReport.js
const mongoose = require('mongoose');

const animalReportSchema = new mongoose.Schema({
  reportType: {
    type: String,
    enum: ['injured', 'stray', 'lost', 'found'],
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String }
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in_progress', 'resolved', 'rejected'],
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updates: [
    {
      status: String,
      note: String,
      updatedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  // Same base as before with these additions:
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO',
    default: null
  },
  
  isResolved: {
    type: Boolean,
    default: false
  },

  resolvedAt: {
    type: Date,
    default: null
  }

});

module.exports = mongoose.model('AnimalReport', animalReportSchema);
// This model defines the structure of an animal report in the database.
// It includes fields for the type of report, image, description, location,