// Simple server startup script with better error handling
console.log('Starting server...');
console.log('Current directory:', __dirname);

try {
  // Load environment variables
  require('dotenv').config();
  console.log('✅ Environment variables loaded');
  console.log('PORT:', process.env.PORT || '5000 (default)');
  console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Not set (will use default)');
  console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set (will use default)');
  
  // Load the server
  console.log('\nLoading server.js...');
  const app = require('./server.js');
  console.log('✅ Server.js loaded successfully');
  
  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`\n✅ Server running on port ${PORT}`);
    console.log(`   API available at: http://localhost:${PORT}`);
    console.log(`   Health check: http://localhost:${PORT}/`);
    console.log('\nAvailable endpoints:');
    console.log('   - POST /api/contact-requests');
    console.log('   - POST /api/appointments');
    console.log('   - POST /api/offers');
    console.log('   - GET  /api/properties');
    console.log('   - POST /login');
    console.log('   - POST /signup');
  });
  
} catch (error) {
  console.error('\n❌ ERROR starting server:');
  console.error('Error name:', error.name);
  console.error('Error message:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
}
