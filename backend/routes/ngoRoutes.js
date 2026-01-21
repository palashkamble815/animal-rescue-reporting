const express = require('express');
const router = express.Router();
const ngoCtrl = require('../controllers/ngoController');
const { protect } = require('../middleware/authMiddleware');

// Dashboard overview (NGO must be logged in)
router.get('/dashboard', protect, ngoCtrl.getDashboardData);

// Reports
router.get('/reports/incoming', protect, ngoCtrl.getIncomingReports);
router.patch('/reports/accept/:reportId', protect, ngoCtrl.acceptReport);
router.patch('/reports/status/:reportId', protect, ngoCtrl.updateReportStatus);
router.get('/reports/resolved', protect, ngoCtrl.getResolvedReports);
router.get('/reports/:reportId', protect, ngoCtrl.getReportDetails);
router.get('/reports/filter/:status', protect, ngoCtrl.filterReportsByStatus);

module.exports = router;
