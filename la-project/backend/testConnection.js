// testConnection.js - MongoDB Atlas Connection Test
const mongoose = require("mongoose");
require('dotenv').config();

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/realestate";

console.log("=".repeat(60));
console.log("MongoDB Atlas Connection Test");
console.log("=".repeat(60));
console.log("\n📋 Connection Details:");
console.log("   URI Pattern:", mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'));
console.log("   Using .env file:", process.env.MONGO_URI ? "✓ Yes" : "✗ No (using fallback)");
console.log("\n🔄 Attempting to connect...\n");

mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
})
.then(() => {
  console.log("✅ SUCCESS: MongoDB connected successfully!");
  console.log("\n📊 Connection Information:");
  console.log("   Database Name:", mongoose.connection.name);
  console.log("   Host:", mongoose.connection.host);
  console.log("   Port:", mongoose.connection.port);
  console.log("   Ready State:", mongoose.connection.readyState === 1 ? "Connected" : "Not Connected");
  
  // Test a simple query
  console.log("\n🔍 Testing database query...");
  return mongoose.connection.db.admin().listDatabases();
})
.then((result) => {
  console.log("✅ Database query successful!");
  console.log("\n📚 Available Databases:");
  result.databases.forEach(db => {
    console.log(`   - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
  });
  
  // List collections in current database
  return mongoose.connection.db.listCollections().toArray();
})
.then((collections) => {
  console.log("\n📦 Collections in current database:");
  if (collections.length === 0) {
    console.log("   (No collections found)");
  } else {
    collections.forEach(col => {
      console.log(`   - ${col.name}`);
    });
  }
  
  console.log("\n" + "=".repeat(60));
  console.log("✅ All tests passed! MongoDB Atlas is working correctly.");
  console.log("=".repeat(60));
  process.exit(0);
})
.catch((err) => {
  console.error("\n❌ ERROR: MongoDB connection failed!");
  console.error("\n🔍 Error Details:");
  console.error("   Message:", err.message);
  console.error("   Name:", err.name);
  
  if (err.message.includes("ENOTFOUND") || err.message.includes("getaddrinfo")) {
    console.error("\n💡 Possible Issues:");
    console.error("   1. Check your internet connection");
    console.error("   2. Verify the MongoDB Atlas cluster URL is correct");
    console.error("   3. Ensure the cluster is not paused");
  } else if (err.message.includes("authentication failed")) {
    console.error("\n💡 Possible Issues:");
    console.error("   1. Check username and password in connection string");
    console.error("   2. Verify database user has correct permissions");
  } else if (err.message.includes("IP") || err.message.includes("whitelist")) {
    console.error("\n💡 Possible Issues:");
    console.error("   1. Add your IP address to MongoDB Atlas IP whitelist");
    console.error("   2. Or allow access from anywhere (0.0.0.0/0)");
  }
  
  console.error("\n" + "=".repeat(60));
  process.exit(1);
});

// Handle connection events
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});
