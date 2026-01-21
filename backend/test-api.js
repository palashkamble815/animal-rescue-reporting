// Quick test script to verify API endpoints
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

// Test data
const testUser = {
  name: 'Test User',
  email: 'testuser@example.com',
  password: 'password123',
  phone: '1234567890',
  address: '123 Test Street, Test City'
};

const testNGO = {
  name: 'Test NGO',
  email: 'testngo@example.com',
  password: 'password123',
  phone: '0987654321',
  address: '456 NGO Street, NGO City'
};

const testPetHospital = {
  name: 'Test Pet Hospital',
  email: 'testhospital@example.com',
  password: 'password123',
  phone: '1122334455',
  address: '789 Hospital Road, Hospital City',
  lat: 19.0760,
  lng: 72.8777
};

async function testAPI() {
  console.log('🧪 Testing Animal Reporting API...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const health = await axios.get(`${API_BASE}/health`);
    console.log('✅ Health check:', health.data);

    // Test user registration
    console.log('\n2. Testing user registration...');
    const userReg = await axios.post(`${API_BASE}/auth/user/register`, testUser);
    console.log('✅ User registration:', userReg.data);

    // Test user login
    console.log('\n3. Testing user login...');
    const userLogin = await axios.post(`${API_BASE}/auth/user/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ User login:', userLogin.data);

    // Test NGO registration
    console.log('\n4. Testing NGO registration...');
    const ngoReg = await axios.post(`${API_BASE}/auth/register`, testNGO);
    console.log('✅ NGO registration:', ngoReg.data);

    // Test NGO login
    console.log('\n5. Testing NGO login...');
    const ngoLogin = await axios.post(`${API_BASE}/auth/login`, {
      email: testNGO.email,
      password: testNGO.password
    });
    console.log('✅ NGO login:', ngoLogin.data);

    // Test pet hospital registration
    console.log('\n6. Testing pet hospital registration...');
    const hospitalReg = await axios.post(`${API_BASE}/auth/pet-hospital/register`, testPetHospital);
    console.log('✅ Pet hospital registration:', hospitalReg.data);

    // Test pet hospital login
    console.log('\n7. Testing pet hospital login...');
    const hospitalLogin = await axios.post(`${API_BASE}/auth/pet-hospital/login`, {
      email: testPetHospital.email,
      password: testPetHospital.password
    });
    console.log('✅ Pet hospital login:', hospitalLogin.data);

    console.log('\n🎉 All API tests passed! Backend is ready for frontend integration.');

  } catch (error) {
    console.error('❌ API test failed:', error.response?.data || error.message);
  }
}

// Run tests if called directly
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI };
