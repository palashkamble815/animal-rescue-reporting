const express = require('express');
const router = express.Router();
const { registerPetHospital, loginPetHospital } = require('../controllers/petHospitalAuthController');

// Pet Hospital Registration
router.post('/register', registerPetHospital);

// Pet Hospital Login
router.post('/login', loginPetHospital);

module.exports = router;
