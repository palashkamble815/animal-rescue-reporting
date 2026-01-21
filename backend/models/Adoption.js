const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  healthStatus: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  contactNumber: { // New field
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Adoption', adoptionSchema);
