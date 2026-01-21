// backend/controllers/lostFoundController.js
const LostFound = require("../models/LostFound");
const path = require("path");
const fs = require("fs");

// Create new Lost & Found report
const createLostFound = async (req, res) => {
  try {
    const { description, ageInMonths, breed, gender, contact } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Photo is required" });
    }

    const newReport = new LostFound({
      photo: req.file.filename,
      description,
      ageInMonths,
      breed,
      gender,
      contact,
      postedBy: req.user.id, // Assign the ID of the authenticated NGO
    });

    await newReport.save();
    res.status(201).json({ message: "Lost & Found report created", report: newReport });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error creating report", error: error.message });
  }
};

// Get all reports
const getAllLostFound = async (req, res) => {
  try {
    const reports = await LostFound.find().sort({ reportedAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error: error.message });
  }
};

// Get single report by ID
const getLostFoundById = async (req, res) => {
  try {
    const report = await LostFound.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: "Error fetching report", error: error.message });
  }
};

// Delete report
const deleteLostFound = async (req, res) => {
  try {
    const report = await LostFound.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Check if the logged-in user (NGO) is the creator of the report
    if (report.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this report' });
    }

    // Delete photo from uploads folder
    const filePath = path.join("uploads", report.photo);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await LostFound.findByIdAndDelete(req.params.id);
    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error deleting report", error: error.message });
  }
};

// Update Lost & Found report
const updateLostFound = async (req, res) => {
  try {
    const { description, ageInMonths, breed, gender, contact } = req.body;
    const reportId = req.params.id;

    const report = await LostFound.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Check if the logged-in user (NGO) is the creator of the report
    if (report.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this report' });
    }

    // Update fields
    if (description) report.description = description;
    if (ageInMonths) report.ageInMonths = ageInMonths;
    if (breed) report.breed = breed;
    if (gender) report.gender = gender;
    if (contact) report.contact = contact;

    // Handle photo update
    if (req.file) {
      // Delete old photo file if it exists
      const oldPhotoPath = path.join("uploads", report.photo);
      if (fs.existsSync(oldPhotoPath)) {
        fs.unlinkSync(oldPhotoPath);
      }
      report.photo = req.file.filename;
    }

    await report.save();
    res.json({ message: 'Lost & Found report updated', report });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error updating report", error: error.message });
  }
};

module.exports = {
  createLostFound,
  getAllLostFound,
  getLostFoundById,
  deleteLostFound,
  updateLostFound // Add updateLostFound to exports
};
