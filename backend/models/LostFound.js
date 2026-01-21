const mongoose = require("mongoose");

const lostFoundSchema = new mongoose.Schema({
  photo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  ageInMonths: {
    type: Number,
    required: true,
  },
  breed: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Unknown"],
    required: true,
  },
  contact: {
    type: String,
    required: true,
    trim: true,
  },
  reportedAt: {
    type: Date,
    default: Date.now,
  },
  postedBy: { // New field
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO', // Assuming 'NGO' is the model for NGOs
    required: true,
  },
});

module.exports = mongoose.model("LostFound", lostFoundSchema);
