// Simple diagnostic script for Railway deployment
console.log('=== Railway Deployment Diagnostic ===');
console.log('Node version:', process.version);
console.log('Platform:', process.platform);
console.log('Architecture:', process.arch);
console.log('Current working directory:', process.cwd());

console.log('\n=== Environment Variables Check ===');
const requiredVars = ['DB_URL', 'JWT_SECRET_KEY', 'NODE_ENV', 'PORT'];
requiredVars.forEach(varName => {
  const value = process.env[varName];
  console.log(`${varName}: ${value ? '✓ SET' : '✗ MISSING'}`);
  if (value && varName !== 'DB_URL' && varName !== 'JWT_SECRET_KEY') {
    console.log(`  Value: ${value}`);
  }
});

console.log('\n=== File System Check ===');
const fs = require('fs');
const path = require('path');

// Check if we can create directories
try {
  const testDir = path.join(__dirname, 'test-logs');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
    console.log('✓ Can create directories');
    fs.rmSync(testDir, { recursive: true });
  } else {
    console.log('✓ Directory creation test passed');
  }
} catch (error) {
  console.log('✗ Cannot create directories:', error.message);
}

console.log('\n=== Database Connection Test ===');
if (process.env.DB_URL) {
  const mongoose = require('mongoose');
  
  mongoose.connect(process.env.DB_URL, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 10000
  })
  .then(() => {
    console.log('✓ Database connection successful');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log('✗ Database connection failed:', error.message);
  });
} else {
  console.log('✗ DB_URL not provided');
}

console.log('\n=== Starting Simple HTTP Server ===');
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    message: 'Railway diagnostic server running',
    timestamp: new Date().toISOString(),
    url: req.url,
    method: req.method
  }));
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`✓ Simple HTTP server running on port ${port}`);
  console.log('=== Diagnostic Complete ===');
});

server.on('error', (error) => {
  console.log('✗ Server error:', error.message);
  process.exit(1);
}); 