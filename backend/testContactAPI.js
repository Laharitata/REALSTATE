const axios = require('axios');

const API_URL = 'http://localhost:5000';

async function testContactSellerAPI() {
  console.log('🧪 Testing Contact Seller API\n');
  console.log('=' .repeat(50));

  try {
    // Step 1: Create a test user
    console.log('\n📝 Step 1: Creating test user...');
    let signupResponse;
    try {
      signupResponse = await axios.post(`${API_URL}/signup`, {
        username: 'testuser',
        password: 'testpass',
        email: 'test@example.com',
        name: 'Test User',
        phone: '1234567890'
      });
      console.log('✅ User created successfully');
    } catch (err) {
      if (err.response && err.response.data.message === 'User already exists') {
        console.log('ℹ️  User already exists, proceeding with login...');
      } else {
        throw err;
      }
    }

    // Step 2: Login to get token
    console.log('\n🔐 Step 2: Logging in...');
    const loginResponse = await axios.post(`${API_URL}/login`, {
      username: 'testuser',
      password: 'testpass'
    });
    const token = loginResponse.data.token;
    const userId = loginResponse.data.user._id;
    console.log('✅ Login successful');
    console.log(`   Token: ${token.substring(0, 20)}...`);
    console.log(`   User ID: ${userId}`);

    // Step 3: Get properties
    console.log('\n🏠 Step 3: Fetching properties...');
    const propertiesResponse = await axios.get(`${API_URL}/api/properties`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const properties = propertiesResponse.data;
    console.log(`✅ Found ${properties.length} properties`);
    
    if (properties.length === 0) {
      console.log('❌ No properties found. Please run seedProperties.js first.');
      return;
    }

    const testProperty = properties[0];
    console.log(`   Testing with property: ${testProperty.title}`);
    console.log(`   Property ID: ${testProperty._id}`);

    // Step 4: Submit contact request
    console.log('\n📧 Step 4: Submitting contact request...');
    const contactRequest = {
      propertyId: testProperty._id,
      message: 'I am interested in this property. Please contact me.'
    };
    
    const submitResponse = await axios.post(
      `${API_URL}/api/contact-requests`,
      contactRequest,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    console.log('✅ Contact request submitted successfully');
    console.log('   Response:', JSON.stringify(submitResponse.data, null, 2));

    // Step 5: Get user's contact requests
    console.log('\n📋 Step 5: Fetching user contact requests...');
    const userRequestsResponse = await axios.get(
      `${API_URL}/api/contact-requests`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    console.log(`✅ Found ${userRequestsResponse.data.length} contact request(s)`);
    console.log('   Requests:', JSON.stringify(userRequestsResponse.data, null, 2));

    // Step 6: Test getting seller requests (if user owns properties)
    console.log('\n🏢 Step 6: Testing seller requests endpoint...');
    try {
      const sellerRequestsResponse = await axios.get(
        `${API_URL}/api/contact-requests/seller`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(`✅ Found ${sellerRequestsResponse.data.length} seller request(s)`);
    } catch (err) {
      console.log('ℹ️  No seller requests (user may not own any properties)');
    }

    console.log('\n' + '='.repeat(50));
    console.log('🎉 All tests completed successfully!');
    console.log('='.repeat(50));

  } catch (error) {
    console.error('\n❌ Test failed:');
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    } else {
      console.error('   Error:', error.message);
    }
  }
}

// Run the tests
testContactSellerAPI();
