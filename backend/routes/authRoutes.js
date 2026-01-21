const express = require('express');
const router = express.Router();
const { registerNGO, loginNGO } = require('../controllers/authController');

// NGO Registration
router.post('/register', registerNGO);

// NGO Login
router.post('/login', loginNGO);

module.exports = router;