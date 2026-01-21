// backend/routes/lostFoundRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/authMiddleware'); // Import protect middleware
const {
  createLostFound,
  getAllLostFound,
  getLostFoundById,
  deleteLostFound,
  updateLostFound, // Import updateLostFound
} = require('../controllers/lostFoundController.js');

const router = express.Router();

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure "uploads" folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post("/", protect, upload.single("photo"), createLostFound); // Apply protect middleware
router.get("/", getAllLostFound);
router.get("/:id", getLostFoundById);
router.put("/:id", protect, upload.single("photo"), updateLostFound); // New PUT route with protect
router.delete("/:id", protect, deleteLostFound); // Apply protect middleware

module.exports = router;
