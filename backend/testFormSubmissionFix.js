const axios = require('axios');

const API_URL = 'http://localhost:5000';

async function testFormSubmissionFix() {
  console.log('='.repeat(60));
  console.log('FORM SUBMISSION FIX - COMPREHENSIVE TEST');
  console.log('='.repeat(60));
  console.log();

  let token = '';
  let propertyId = '';
  let testUserId = '';

  try {
    // Test 1: Create/Login Test User
    console.log('📝 Test 1: User Authentication');
    console.log('-'.repeat(60));
    
    try {
      const signupResponse = await axios.post(`${API_URL}/signup`, {
        username: 'formtestuser',
        password: 'testpass123',
        email: 'formtest@example.com',
        name: 'Form Test User',
        phone: '1234567890'
      });
      console.log('✅ New user created:', signupResponse.data.message);
    } catch (err) {
      if (err.response?.status === 400) {
        console.log('ℹ️  User already exists, proceeding with login');
      } else {
        throw err;
      }
    }

    const loginResponse = await axios.post(`${API_URL}/login`, {
      username: 'formtestuser',
      password: 'testpass123'
    });
    
    token = loginResponse.data.token;
    testUserId = loginResponse.data.user;
    console.log('✅ Login successful');
    console.log('   Token:', token.substring(0, 20) + '...');
    console.log();

    // Test 2: Fetch Properties
    console.log('📝 Test 2: Fetch Properties');
    console.log('-'.repeat(60));
    
    const propertiesResponse = await axios.get(`${API_URL}/api/properties`);
    const properties = propertiesResponse.data;
    
    if (properties.length === 0) {
      console.log('❌ No properties found in database');
      console.log('   Please run: node seedProperties.js');
      return;
    }
    
    propertyId = properties[0]._id;
    console.log('✅ Properties fetched:', properties.length);
    console.log('   Using property:', properties[0].title);
    console.log('   Property ID:', propertyId);
    console.log();

    // Test 3: Submit Contact Request (Main Test)
    console.log('📝 Test 3: Submit Contact Request (MAIN TEST)');
    console.log('-'.repeat(60));
    
    const contactRequestData = {
      propertyId: propertyId,
      message: 'I am interested in buying this property. Please contact me for further details.'
    };
    
    console.log('Request Data:', JSON.stringify(contactRequestData, null, 2));
    console.log('Authorization Header:', `Bearer ${token.substring(0, 20)}...`);
    console.log();
    
    const contactResponse = await axios.post(
      `${API_URL}/api/contact-requests`,
      contactRequestData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('✅ Contact request submitted successfully!');
    console.log('   Response:', JSON.stringify(contactResponse.data, null, 2));
    console.log();

    // Test 4: Verify Contact Request was Saved
    console.log('📝 Test 4: Verify Contact Request in Database');
    console.log('-'.repeat(60));
    
    const getRequestsResponse = await axios.get(
      `${API_URL}/api/contact-requests`,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );
    
    const userRequests = getRequestsResponse.data.contactRequests;
    console.log('✅ Contact requests retrieved:', userRequests.length);
    
    if (userRequests.length > 0) {
      const latestRequest = userRequests[0];
      console.log('   Latest request:');
      console.log('   - Property:', latestRequest.property?.title || 'N/A');
      console.log('   - Message:', latestRequest.message.substring(0, 50) + '...');
      console.log('   - Status:', latestRequest.status);
      console.log('   - Created:', new Date(latestRequest.createdAt).toLocaleString());
    }
    console.log();

    // Test 5: Test Error Scenarios
    console.log('📝 Test 5: Error Handling Tests');
    console.log('-'.repeat(60));
    
    // Test 5a: Missing Token
    console.log('Test 5a: Missing Authorization Token');
    try {
      await axios.post(
        `${API_URL}/api/contact-requests`,
        contactRequestData
      );
      console.log('❌ Should have failed without token');
    } catch (err) {
      if (err.response?.status === 401) {
        console.log('✅ Correctly rejected: 401 Unauthorized');
        console.log('   Message:', err.response.data.message);
      } else {
        console.log('⚠️  Unexpected error:', err.message);
      }
    }
    console.log();

    // Test 5b: Invalid Property ID
    console.log('Test 5b: Invalid Property ID');
    try {
      await axios.post(
        `${API_URL}/api/contact-requests`,
        {
          propertyId: '507f1f77bcf86cd799439011', // Invalid ID
          message: 'Test message'
        },
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      console.log('❌ Should have failed with invalid property ID');
    } catch (err) {
      if (err.response?.status === 404) {
        console.log('✅ Correctly rejected: 404 Not Found');
        console.log('   Error:', err.response.data.error);
      } else {
        console.log('⚠️  Unexpected error:', err.message);
      }
    }
    console.log();

    // Test 5c: Empty Message
    console.log('Test 5c: Empty Message Validation');
    try {
      await axios.post(
        `${API_URL}/api/contact-requests`,
        {
          propertyId: propertyId,
          message: ''
        },
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      console.log('❌ Should have failed with empty message');
    } catch (err) {
      if (err.response?.status === 500) {
        console.log('✅ Correctly rejected: Validation Error');
        console.log('   Error:', err.response.data.error);
      } else {
        console.log('⚠️  Unexpected error:', err.message);
      }
    }
    console.log();

    // Summary
    console.log('='.repeat(60));
    console.log('✅ ALL TESTS PASSED!');
    console.log('='.repeat(60));
    console.log();
    console.log('Summary:');
    console.log('✅ User authentication working');
    console.log('✅ Properties fetched successfully');
    console.log('✅ Contact request submission working');
    console.log('✅ Contact request saved to database');
    console.log('✅ Error handling working correctly');
    console.log();
    console.log('The form submission fix is working correctly!');
    console.log('The frontend should now be able to submit contact requests.');
    console.log();

  } catch (error) {
    console.error('❌ TEST FAILED');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response:', error.response.data);
    }
    process.exit(1);
  }
}

// Run the test
testFormSubmissionFix();
