// backend/controllers/authController.js
const NGO = require('../models/NGO');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerNGO = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Check if NGO already exists
    let existingNGO = await NGO.findOne({ email });
    if (existingNGO) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create NGO
    const ngo = new NGO({
      name,
      email,
      password: hashedPassword,
      phone,
      address
    });

    await ngo.save();

    res.status(201).json({ message: 'NGO registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginNGO = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find NGO
    const ngo = await NGO.findOne({ email });
    if (!ngo) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, ngo.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create JWT Token
    const token = jwt.sign(
      { id: ngo._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Send NGO data without password
    const ngoData = {
      id: ngo._id,
      name: ngo.name,
      email: ngo.email,
      phone: ngo.phone,
      address: ngo.address,
      profileImage: ngo.profileImage,
      isVerified: ngo.isVerified,
      registeredAt: ngo.registeredAt
    };

    res.json({
      message: 'Login successful',
      token,
      ngo: ngoData
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
