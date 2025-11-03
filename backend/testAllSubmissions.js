// Test script to verify all form submissions are working
const axios = require('axios');

const API_URL = 'http://localhost:5000';
let authToken = '';
let testUserId = '';
let testPropertyId = '';

// Helper function to log results
function logResult(testName, success, details = '') {
  const status = success ? '✅ PASS' : '❌ FAIL';
  console.log(`\n${status} - ${testName}`);
  if (details) console.log(`   ${details}`);
}

// Test 1: Signup
async function testSignup() {
  try {
    const response = await axios.post(`${API_URL}/api/signup`, {
      username: `testuser_${Date.now()}`,
      password: 'testpass123',
      email: `test_${Date.now()}@example.com`,
      name: 'Test User',
      phone: '1234567890'
    });
    
    logResult('Signup', response.status === 200, `User registered: ${response.data.message}`);
    return true;
  } catch (err) {
    logResult('Signup', false, err.response?.data?.message || err.message);
    return false;
  }
}

// Test 2: Login
async function testLogin() {
  try {
    const username = `logintest_${Date.now()}`;
    
    // First create a user
    await axios.post(`${API_URL}/api/signup`, {
      username,
      password: 'testpass123',
      email: `logintest_${Date.now()}@example.com`,
      name: 'Login Test User',
      phone: '9876543210'
    });
    
    // Then login
    const response = await axios.post(`${API_URL}/api/login`, {
      username,
      password: 'testpass123'
    });
    
    authToken = response.data.token;
    testUserId = response.data.user.username;
    
    logResult('Login', response.status === 200 && authToken, `Token received, User: ${testUserId}`);
    return true;
  } catch (err) {
    logResult('Login', false, err.response?.data?.message || err.message);
    return false;
  }
}

// Test 3: Profile
async function testProfile() {
  try {
    const response = await axios.get(`${API_URL}/api/profile`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    logResult('Profile', response.status === 200, `User: ${response.data.user.name}`);
    return true;
  } catch (err) {
    logResult('Profile', false, err.response?.data?.message || err.message);
    return false;
  }
}

// Test 4: Create Property (Sell)
async function testCreateProperty() {
  try {
    const FormData = require('form-data');
    const fs = require('fs');
    const path = require('path');
    
    const formData = new FormData();
    formData.append('title', 'Test Property');
    formData.append('location', 'Test Location');
    formData.append('price', '1000000');
    formData.append('sqft', '1500');
    formData.append('rooms', '3');
    formData.append('bathrooms', '2');
    formData.append('category', 'Flat');
    formData.append('isRent', 'false');
    
    const response = await axios.post(`${API_URL}/api/properties`, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${authToken}`
      }
    });
    
    testPropertyId = response.data._id;
    logResult('Create Property', response.status === 200, `Property created: ${response.data.title}`);
    return true;
  } catch (err) {
    logResult('Create Property', false, err.response?.data?.message || err.message);
    return false;
  }
}

// Test 5: Get Properties
async function testGetProperties() {
  try {
    const response = await axios.get(`${API_URL}/api/properties`);
    
    logResult('Get Properties', response.status === 200 && response.data.length > 0, 
      `Found ${response.data.length} properties`);
    
    // Use first property for subsequent tests if we don't have one
    if (!testPropertyId && response.data.length > 0) {
      testPropertyId = response.data[0]._id;
    }
    
    return true;
  } catch (err) {
    logResult('Get Properties', false, err.response?.data?.message || err.message);
    return false;
  }
}

// Test 6: Contact Request
async function testContactRequest() {
  try {
    if (!testPropertyId) {
      logResult('Contact Request', false, 'No property ID available');
      return false;
    }
    
    const response = await axios.post(`${API_URL}/api/contact-requests`, {
      propertyId: testPropertyId,
      message: 'I am interested in this property. Please contact me.'
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    logResult('Contact Request', response.status === 200, 
      `Request submitted: ${response.data.message}`);
    return true;
  } catch (err) {
    logResult('Contact Request', false, err.response?.data?.error || err.message);
    return false;
  }
}

// Test 7: Appointment
async function testAppointment() {
  try {
    if (!testPropertyId) {
      logResult('Appointment', false, 'No property ID available');
      return false;
    }
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const response = await axios.post(`${API_URL}/api/appointments`, {
      propertyId: testPropertyId,
      appointmentDate: tomorrow.toISOString().split('T')[0],
      appointmentTime: '14:00',
      appointmentType: 'in-person',
      message: 'Looking forward to viewing the property'
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    logResult('Appointment', response.status === 200, 
      `Appointment scheduled: ${response.data.message}`);
    return true;
  } catch (err) {
    logResult('Appointment', false, err.response?.data?.error || err.message);
    return false;
  }
}

// Test 8: Offer
async function testOffer() {
  try {
    if (!testPropertyId) {
      logResult('Offer', false, 'No property ID available');
      return false;
    }
    
    const response = await axios.post(`${API_URL}/api/offers`, {
      propertyId: testPropertyId,
      offerAmount: 950000,
      financingType: 'mortgage',
      message: 'This is my best offer'
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    logResult('Offer', response.status === 200, 
      `Offer submitted: ${response.data.message}`);
    return true;
  } catch (err) {
    logResult('Offer', false, err.response?.data?.error || err.message);
    return false;
  }
}

// Test 9: Wishlist
async function testWishlist() {
  try {
    if (!testPropertyId) {
      logResult('Wishlist', false, 'No property ID available');
      return false;
    }
    
    // Add to wishlist
    const addResponse = await axios.post(`${API_URL}/api/wishlist`, {
      id: testPropertyId
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    // Get wishlist
    const getResponse = await axios.get(`${API_URL}/api/wishlist`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    logResult('Wishlist', addResponse.status === 200 && getResponse.status === 200, 
      `Wishlist items: ${getResponse.data.wishlist.length}`);
    return true;
  } catch (err) {
    logResult('Wishlist', false, err.response?.data?.error || err.message);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('\n========================================');
  console.log('🧪 Testing All Form Submissions');
  console.log('========================================');
  console.log(`API URL: ${API_URL}`);
  console.log('========================================\n');
  
  let passCount = 0;
  let totalTests = 9;
  
  // Run tests sequentially
  if (await testSignup()) passCount++;
  if (await testLogin()) passCount++;
  if (await testProfile()) passCount++;
  if (await testGetProperties()) passCount++;
  if (await testCreateProperty()) passCount++;
  if (await testContactRequest()) passCount++;
  if (await testAppointment()) passCount++;
  if (await testOffer()) passCount++;
  if (await testWishlist()) passCount++;
  
  // Summary
  console.log('\n========================================');
  console.log('📊 Test Summary');
  console.log('========================================');
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${passCount}`);
  console.log(`Failed: ${totalTests - passCount}`);
  console.log(`Success Rate: ${((passCount / totalTests) * 100).toFixed(1)}%`);
  console.log('========================================\n');
  
  if (passCount === totalTests) {
    console.log('🎉 ALL TESTS PASSED! All submissions are working correctly.\n');
  } else {
    console.log('⚠️  Some tests failed. Please check the errors above.\n');
  }
}

// Run tests
runAllTests().catch(err => {
  console.error('\n❌ Test execution failed:', err.message);
  process.exit(1);
});
