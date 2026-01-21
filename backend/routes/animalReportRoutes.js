const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const animalReportController = require('../controllers/animalReportController');
const { protect } = require('../middleware/authMiddleware');

router.post('/reports', upload.single('image'), animalReportController.createReport);
router.get('/reports', animalReportController.getReports);
router.put('/reports/:id/status', protect, animalReportController.updateAnimalReportStatus);
router.get('/reports/ngo/:ngoId', protect, animalReportController.getAnimalReportsByNGO);

module.exports = router;