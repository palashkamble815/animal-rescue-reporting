const AnimalReport = require('../models/AnimalReport');
const SuccessStory = require('../models/SuccessStory'); // new import
const Adoption = require('../models/Adoption'); // optional, for later if needed

// ================= Existing Code =================

// View all incoming (pending) reports
exports.getIncomingReports = async (req, res) => {
  const reports = await AnimalReport.find({ status: 'pending' });
  res.json(reports);
};

// Accept report (update status and assign NGO)
exports.acceptReport = async (req, res) => {
  const { reportId } = req.params;
  const { ngoId } = req.body;

  const report = await AnimalReport.findByIdAndUpdate(
    reportId,
    { status: 'accepted', assignedTo: ngoId },
    { new: true }
  );

  res.json(report);
};

// Update report status (progress, resolved, etc.)
exports.updateReportStatus = async (req, res) => {
  try {
    const { status, note } = req.body;
    const reportId = req.params.reportId;

    const updateFields = {
      status,
      $push: {
        updates: {
          status,
          note,
          updatedAt: new Date()
        }
      }
    };

    if (status === 'resolved') {
      updateFields.isResolved = true;
      updateFields.resolvedAt = new Date();
    }

    const updatedReport = await AnimalReport.findByIdAndUpdate(
      reportId,
      updateFields,
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.status(200).json({ message: 'Status updated', report: updatedReport });
  } catch (error) {
    console.error('Error updating report status:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
};

// List resolved reports
exports.getResolvedReports = async (req, res) => {
  try {
    const ngoId = req.query.ngoId;

    if (!ngoId) {
      return res.status(400).json({ error: 'ngoId is required in query' });
    }

    const reports = await AnimalReport.find({
      isResolved: true,
      acceptedBy: ngoId
    })
      .sort({ resolvedAt: -1 })
      .select('description createdAt resolvedAt reportType location');

    res.status(200).json(reports);
  } catch (err) {
    console.error('Error fetching resolved reports:', err);
    res.status(500).json({ error: 'Failed to fetch resolved reports' });
  }
};

// Get full details of a specific report
exports.getReportDetails = async (req, res) => {
  try {
    const { reportId } = req.params;
    const report = await AnimalReport.findById(reportId)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('acceptedBy', 'name email');

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.json(report);
  } catch (error) {
    console.error('Error fetching report details:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.filterReportsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const ngoId = req.query.ngoId;
    const filter = { assignedTo: ngoId };

    if (status !== 'all') {
      filter.status = status;
    }

    const reports = await AnimalReport.find(filter);
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: 'Failed to filter reports' });
  }
};

// ================= New Dashboard Summary API =================
exports.getDashboardData = async (req, res) => {
  try {
    const ngoId = req.user.id; // coming from authMiddleware

    // Count total reports for this NGO
    const totalReports = await AnimalReport.countDocuments({ assignedTo: ngoId });

    // Count pending reports
    const pendingReports = await AnimalReport.countDocuments({
      assignedTo: ngoId,
      status: 'pending'
    });

    // Count accepted reports
    const acceptedReports = await AnimalReport.countDocuments({
      assignedTo: ngoId,
      status: 'accepted'
    });

    // Count resolved reports
    const resolvedReports = await AnimalReport.countDocuments({
      assignedTo: ngoId,
      status: 'resolved'
    });

    // Count success stories
    const successStories = await SuccessStory.countDocuments({ ngo: ngoId });

    res.json({
      totalReports,
      pendingReports,
      acceptedReports,
      resolvedReports,
      successStories
    });
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res.status(500).json({ message: 'Server error' });
  }
};