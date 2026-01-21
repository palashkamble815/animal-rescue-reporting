const AnimalReport = require('../models/AnimalReport');
const path = require('path');

const createReport = async (req, res) => {
  try {
    const { animalType, description, address, latitude, longitude } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const report = new AnimalReport({
      reportType: animalType.toLowerCase(),
      image: '/uploads/' + req.file.filename,
      description,
      location: {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
        address,
      },
      createdBy: req.user ? req.user._id : null, // will integrate auth later
    });

    await report.save();
    res.status(201).json({ message: 'Report saved successfully', report });
  } catch (err) {
    console.error('Error saving report:', err);
    res.status(500).json({ message: 'Failed to save report', error: err.message });
  }
};

const getResolvedReportsByNGO = async (req, res) => {
  try {
    const ngoId = req.params.ngoId;

    const resolvedReports = await AnimalReport.find({
      isResolved: true,
      acceptedBy: ngoId
    })
      .sort({ resolvedAt: -1 })
      .select('description createdAt resolvedAt location reportType');

    res.status(200).json(resolvedReports);
  } catch (err) {
    console.error('Error fetching resolved reports:', err);
    res.status(500).json({ error: 'Failed to fetch resolved reports' });
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await AnimalReport.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    console.error('Error fetching reports:', err);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
};

const updateAnimalReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, ngoId } = req.body;

    const report = await AnimalReport.findById(id);

    if (!report) {
      return res.status(404).json({ message: 'Animal report not found' });
    }

    // Logic for accepting a report
    if (status === 'accepted') {
      if (report.assignedTo && report.assignedTo.toString() !== ngoId) {
        return res.status(400).json({ message: 'Report already accepted by another NGO' });
      }
      report.assignedTo = ngoId;
      report.acceptedBy = ngoId;
      report.acceptedAt = new Date();
    } else if (report.assignedTo && report.assignedTo.toString() !== ngoId) {
      // For other status updates, ensure the NGO is assigned to the report
      return res.status(403).json({ message: 'You are not authorized to update this report' });
    }

    report.status = status;

    if (status === 'resolved') {
      report.isResolved = true;
      report.resolvedAt = new Date();
    }

    await report.save();
    res.status(200).json({ message: 'Animal report status updated successfully', report });
  } catch (err) {
    console.error('Error updating animal report status:', err);
    res.status(500).json({ message: 'Failed to update animal report status', error: err.message });
  }
};

const getAnimalReportsByNGO = async (req, res) => {
  try {
    const reports = await AnimalReport.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    console.error('Error fetching animal reports by NGO:', err);
    res.status(500).json({ message: 'Failed to fetch animal reports by NGO', error: err.message });
  }
};

module.exports = {
  createReport,
  getResolvedReportsByNGO,
  getReports,
  updateAnimalReportStatus,
  getAnimalReportsByNGO
};