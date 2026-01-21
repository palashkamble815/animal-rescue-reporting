const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/authMiddleware'); // Import protect middleware
const {
  createAdoption,
  getAdoptions,
  deleteAdoption,
  updateAdoptionPost // Also import updateAdoptionPost
} = require('../controllers/adoptionController');

// POST adoption details
router.post('/', protect, upload.single('image'), createAdoption); // Apply protect middleware

// GET all adoption posts
router.get('/', getAdoptions);

// PUT update adoption post
router.put('/:id', protect, upload.single('image'), updateAdoptionPost); // Apply protect middleware

// DELETE adoption post
router.delete('/:id', protect, deleteAdoption); // Apply protect middleware

module.exports = router;
