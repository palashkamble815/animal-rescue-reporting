# Animal Reporting Backend API

A comprehensive backend API for an animal reporting and rescue platform supporting users, NGOs, and pet hospitals.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/animal_reporting
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

4. Start the server:
```bash
npm start
```

## 📋 API Documentation

### Authentication Endpoints

#### User Authentication
- `POST /api/auth/user/register` - Register new user
- `POST /api/auth/user/login` - User login

#### NGO Authentication
- `POST /api/auth/register` - Register new NGO
- `POST /api/auth/login` - NGO login

#### Pet Hospital Authentication
- `POST /api/auth/pet-hospital/register` - Register new pet hospital
- `POST /api/auth/pet-hospital/login` - Pet hospital login

### Core Functionality

#### Animal Reports
- `POST /api/reports` - Create new animal report (with image upload)
- `GET /api/reports` - Get all reports
- `GET /api/reports/:id` - Get specific report
- `PATCH /api/ngo/reports/status/:reportId` - Update report status (NGO only)

#### Success Stories
- `GET /api/success-stories` - Get all success stories
- `POST /api/success-stories` - Create success story (NGO only)
- `PUT /api/success-stories/:id/like` - Like success story

#### Adoptions
- `GET /api/adoptions` - Get all adoption posts
- `POST /api/adoptions` - Create adoption post (NGO only)

#### Lost & Found
- `GET /api/lost-and-found` - Get all lost & found posts
- `POST /api/lost-and-found` - Create lost & found post

### NGO Dashboard
- `GET /api/ngo/dashboard` - Get dashboard summary
- `GET /api/ngo/reports/incoming` - Get incoming reports
- `GET /api/ngo/reports/resolved` - Get resolved reports
- `GET /api/ngo/reports/filter/:status` - Filter reports by status

## 📊 Data Models

### User
```javascript
{
  name: String,
  email: String,
  password: String,
  phone: String,
  address: String,
  profileImage: String,
  registeredAt: Date
}
```

### NGO
```javascript
{
  name: String,
  email: String,
  password: String,
  phone: String,
  address: String,
  profileImage: String,
  isVerified: Boolean,
  registeredAt: Date
}
```

### Pet Hospital
```javascript
{
  name: String,
  email: String,
  password: String,
  phone: String,
  address: String,
  location: { lat: Number, lng: Number },
  profileImage: String,
  isVerified: Boolean,
  registeredAt: Date
}
```

### Animal Report
```javascript
{
  reportType: String, // injured, stray, lost, found
  image: String,
  description: String,
  location: { lat: Number, lng: Number, address: String },
  status: String, // pending, accepted, in_progress, resolved, rejected
  createdBy: ObjectId, // User reference
  assignedTo: ObjectId, // NGO reference
  createdAt: Date,
  updates: Array,
  isResolved: Boolean,
  resolvedAt: Date
}
```

### Success Story
```javascript
{
  title: String,
  description: String,
  image: String,
  createdBy: ObjectId, // NGO reference
  createdAt: Date,
  likes: Number
}
```

## 🧪 Testing

Run the test script to verify all endpoints:
```bash
node test-api.js
```

## 🔧 Development

### File Structure
```
backend/
├── controllers/          # Route handlers
├── models/              # Database models
├── routes/              # API routes
├── middleware/          # Authentication & validation
├── uploads/             # Image storage
├── server.js            # Main server file
├── test-api.js          # API testing script
└── README.md            # This file
```

### Adding New Features
1. Create model in `models/`
2. Add controller in `controllers/`
3. Create route in `routes/`
4. Update server.js if needed
5. Add tests to `test-api.js`

## 🐛 Troubleshooting

### Common Issues
1. **MongoDB Connection**: Ensure MongoDB is running
2. **Port Already in Use**: Change PORT in .env
3. **CORS Issues**: Check frontend URL in CORS configuration
4. **Image Upload**: Ensure uploads directory exists

### Debug Mode
```bash
DEBUG=* npm start
```

## 📞 Support
For issues and questions, please check:
1. Console logs for error messages
2. MongoDB connection status
3. Environment variables configuration
4. API endpoint documentation above

## 🤝 Contributing
1. Fork the repository
2. Create feature branch
3. Add tests for new features
4. Submit pull request

## 📄 License
ISC License
