const PetHospital = require('../models/PetHospital');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerPetHospital = async (req, res) => {
  try {
    const { name, email, password, phone, address, lat, lng } = req.body;

    // Check if pet hospital already exists
    let existingHospital = await PetHospital.findOne({ email });
    if (existingHospital) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create pet hospital
    const hospital = new PetHospital({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      location: {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      }
    });

    await hospital.save();

    res.status(201).json({ message: 'Pet hospital registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginPetHospital = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find pet hospital
    const hospital = await PetHospital.findOne({ email });
    if (!hospital) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, hospital.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create JWT Token
    const token = jwt.sign(
      { id: hospital._id, type: 'petHospital' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Send hospital data without password
    const hospitalData = {
      id: hospital._id,
      name: hospital.name,
      email: hospital.email,
      phone: hospital.phone,
      address: hospital.address,
      location: hospital.location,
      profileImage: hospital.profileImage,
      isVerified: hospital.isVerified,
      registeredAt: hospital.registeredAt
    };

    res.json({
      message: 'Login successful',
      token,
      hospital: hospitalData
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
