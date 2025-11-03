const axios = require('axios');

const API_URL = 'http://localhost:5000';

// Test data
let authToken = '';
let testPropertyId = '';

async function testFormSubmission() {
  console.log('=== Testing Form Submission Fix ===\n');

  try {
    // Step 0: Create test user
    console.log('0. Creating Test User...');
    const testUsername = 'formtestuser_' + Date.now();
    const testPassword = 'TestPass123!';
    
    await axios.post(`${API_URL}/signup`, {
      username: testUsername,
      password: testPassword,
      email: `${testUsername}@example.com`,
      name: 'Form Test User',
      phone: '9999999999'
    });
    console.log('✅ Test user created:', testUsername);

    // Step 1: Login to get token
    console.log('\n1. Testing Login...');
    const loginResponse = await axios.post(`${API_URL}/login`, {
      username: testUsername,
      password: testPassword
    });
    
    if (loginResponse.data.token) {
      authToken = loginResponse.data.token;
      console.log('✅ Login successful');
      console.log('   Token:', authToken.substring(0, 20) + '...');
      console.log('   User:', loginResponse.data.user.name);
    } else {
      console.log('❌ Login failed - no token received');
      return;
    }

    // Step 2: Get properties
    console.log('\n2. Fetching Properties...');
    const propertiesResponse = await axios.get(`${API_URL}/api/properties`);
    
    if (propertiesResponse.data && propertiesResponse.data.length > 0) {
      testPropertyId = propertiesResponse.data[0]._id;
      console.log('✅ Properties fetched successfully');
      console.log('   Total properties:', propertiesResponse.data.length);
      console.log('   Test property ID:', testPropertyId);
      console.log('   Test property:', propertiesResponse.data[0].title);
    } else {
      console.log('❌ No properties found');
      return;
    }

    // Step 3: Test contact request submission (SUCCESS CASE)
    console.log('\n3. Testing Contact Request Submission (Success Case)...');
    const contactResponse = await axios.post(
      `${API_URL}/api/contact-requests`,
      {
        propertyId: testPropertyId,
        message: 'I am interested in buying this property. Please contact me.'
      },
      {
        headers: { Authorization: `Bearer ${authToken}` }
      }
    );

    if (contactResponse.data && contactResponse.data.message) {
      console.log('✅ Contact request submitted successfully');
      console.log('   Response:', contactResponse.data.message);
      console.log('   Contact Request ID:', contactResponse.data.contactRequest._id);
    } else {
      console.log('❌ Contact request submission failed');
    }

    // Step 4: Test empty message validation (should fail on frontend, but test backend)
    console.log('\n4. Testing Empty Message (Should Fail)...');
    try {
      await axios.post(
        `${API_URL}/api/contact-requests`,
        {
          propertyId: testPropertyId,
          message: ''
        },
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );
      console.log('⚠️  Backend accepted empty message (frontend should prevent this)');
    } catch (err) {
      console.log('✅ Backend rejected empty message:', err.response?.data?.error || err.message);
    }

    // Step 5: Test missing token (should fail)
    console.log('\n5. Testing Missing Token (Should Fail)...');
    try {
      await axios.post(
        `${API_URL}/api/contact-requests`,
        {
          propertyId: testPropertyId,
          message: 'Test message'
        }
      );
      console.log('❌ Request succeeded without token (security issue!)');
    } catch (err) {
      if (err.response?.status === 401) {
        console.log('✅ Correctly rejected request without token');
        console.log('   Status:', err.response.status);
        console.log('   Message:', err.response.data.message);
      } else {
        console.log('⚠️  Unexpected error:', err.message);
      }
    }

    // Step 6: Test invalid property ID (should fail)
    console.log('\n6. Testing Invalid Property ID (Should Fail)...');
    try {
      await axios.post(
        `${API_URL}/api/contact-requests`,
        {
          propertyId: '507f1f77bcf86cd799439011', // Invalid ID
          message: 'Test message'
        },
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );
      console.log('❌ Request succeeded with invalid property ID');
    } catch (err) {
      if (err.response?.status === 404) {
        console.log('✅ Correctly rejected invalid property ID');
        console.log('   Status:', err.response.status);
        console.log('   Error:', err.response.data.error);
      } else {
        console.log('⚠️  Unexpected error:', err.message);
      }
    }

    // Step 7: Get user's contact requests
    console.log('\n7. Fetching User Contact Requests...');
    const userRequestsResponse = await axios.get(
      `${API_URL}/api/contact-requests`,
      {
        headers: { Authorization: `Bearer ${authToken}` }
      }
    );

    if (userRequestsResponse.data && userRequestsResponse.data.contactRequests) {
      console.log('✅ Contact requests fetched successfully');
      console.log('   Total requests:', userRequestsResponse.data.contactRequests.length);
      if (userRequestsResponse.data.contactRequests.length > 0) {
        const latestRequest = userRequestsResponse.data.contactRequests[0];
        console.log('   Latest request:');
        console.log('     - Property:', latestRequest.property?.title);
        console.log('     - Message:', latestRequest.message);
        console.log('     - Status:', latestRequest.status);
      }
    }

    console.log('\n=== All Tests Completed Successfully ===');

  } catch (error) {
    console.error('\n❌ Test failed with error:');
    console.error('   Message:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
  }
}

// Run tests
testFormSubmission();
