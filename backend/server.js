const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { protect } = require('./middleware/authMiddleware');

require('dotenv').config();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
//app.use('/uploads', express.static('uploads')); // Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


// Routes
const animalReportRoutes = require('./routes/animalReportRoutes');
app.use('/api', animalReportRoutes);

const ngoRoutes = require('./routes/ngoRoutes');
app.use('/api/ngo', ngoRoutes);

const successStoryRoutes = require('./routes/successStoryRoutes');
app.use('/api/success-stories', successStoryRoutes);

const adoptionRoutes = require('./routes/adoptionRoutes');
app.use('/api/adoptions', adoptionRoutes);

const lostFoundRoutes = require('./routes/lostFoundRoutes');
app.use('/api/lost-and-found', lostFoundRoutes);

// Authentication routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const userAuthRoutes = require('./routes/userAuthRoutes');
app.use('/api/auth/user', userAuthRoutes);

const petHospitalAuthRoutes = require('./routes/petHospitalAuthRoutes');
app.use('/api/auth/pet-hospital', petHospitalAuthRoutes);

// health
app.get('/api/health', (req, res) => res.json({ ok: true }));





// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Animal Report backend is working!' });
});


app.get('/api/secure-data', protect, (req, res) => {
  res.json({ message: 'This is protected', ngo: req.ngo });
});


// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const fs = require('fs');

// Ensure uploads folder exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

