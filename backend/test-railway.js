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

// Sample data for testing
const sampleListings = [
  {
    id: '1',
    title: 'Calculus Textbook - Early Transcendentals',
    description: 'Used calculus textbook in good condition. Perfect for MATH 137/138.',
    price: 120,
    category: 'textbooks',
    condition: 'good',
    status: 'active',
    imageUrl: 'https://via.placeholder.com/300x400/4F46E5/white?text=Calculus+Book',
    seller: 'John Doe',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Programming Laptop - ThinkPad X1',
    description: 'Excellent laptop for CS students. Intel i7, 16GB RAM, 512GB SSD.',
    price: 800,
    category: 'electronics',
    condition: 'excellent',
    status: 'active',
    imageUrl: 'https://via.placeholder.com/300x400/059669/white?text=Laptop',
    seller: 'Jane Smith',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Physics Lab Manual',
    description: 'Required lab manual for PHYS 111/112. Barely used.',
    price: 45,
    category: 'textbooks',
    condition: 'like-new',
    status: 'active',
    imageUrl: 'https://via.placeholder.com/300x400/DC2626/white?text=Physics+Manual',
    seller: 'Mike Johnson',
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Scientific Calculator TI-84',
    description: 'TI-84 Plus CE calculator. Great for math and engineering courses.',
    price: 80,
    category: 'electronics',
    condition: 'good',
    status: 'active',
    imageUrl: 'https://via.placeholder.com/300x400/7C3AED/white?text=Calculator',
    seller: 'Sarah Wilson',
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Organic Chemistry Textbook',
    description: 'Comprehensive organic chemistry textbook with solutions manual.',
    price: 150,
    category: 'textbooks',
    condition: 'fair',
    status: 'active',
    imageUrl: 'https://via.placeholder.com/300x400/EA580C/white?text=Chemistry+Book',
    seller: 'Alex Chen',
    createdAt: new Date().toISOString()
  }
];

console.log('\n=== Starting Enhanced HTTP Server ===');
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Route handling
  if (pathname === '/') {
    res.writeHead(200);
    res.end(JSON.stringify({
      message: 'UWaterloo Marketplace API - Enhanced with Sample Data',
      version: '1.0.0',
      status: 'active',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      sampleDataCount: sampleListings.length
    }));
  } else if (pathname === '/health') {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage()
    }));
  } else if (pathname === '/api/health') {
    res.writeHead(200);
    res.end(JSON.stringify({
      api: 'healthy',
      timestamp: new Date().toISOString()
    }));
  } else if (pathname === '/api/listings/get-all-listings') {
    // Apply query filters if provided
    const query = parsedUrl.query;
    let filteredListings = [...sampleListings];
    
    if (query.category && query.category !== 'all') {
      filteredListings = filteredListings.filter(item => item.category === query.category);
    }
    
    if (query.limit) {
      filteredListings = filteredListings.slice(0, parseInt(query.limit));
    }
    
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      message: 'Sample listings retrieved',
      listings: filteredListings,
      total: filteredListings.length,
      timestamp: new Date().toISOString()
    }));
  } else if (pathname === '/api/listings/user-listings') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      message: 'User listings endpoint working',
      listings: sampleListings.slice(0, 2), // Show first 2 as user's listings
      timestamp: new Date().toISOString()
    }));
  } else if (pathname.startsWith('/api/listings/') && pathname !== '/api/listings/get-all-listings' && pathname !== '/api/listings/user-listings') {
    const listingId = pathname.split('/').pop();
    const listing = sampleListings.find(item => item.id === listingId) || sampleListings[0];
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      message: 'Single listing retrieved',
      listings: listing,
      timestamp: new Date().toISOString()
    }));
  } else if (pathname === '/api/books') {
    const books = sampleListings.filter(item => item.category === 'textbooks');
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      message: 'Books endpoint working',
      listings: books,
      timestamp: new Date().toISOString()
    }));
  } else if (pathname === '/api/admin') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      message: 'Admin endpoint working',
      listings: { 
        totalListings: sampleListings.length,
        activeListings: sampleListings.filter(item => item.status === 'active').length,
        categories: ['textbooks', 'electronics'],
        stats: 'Sample admin data'
      },
      timestamp: new Date().toISOString()
    }));
  } else if (pathname.startsWith('/api/')) {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: false,
      message: `API endpoint ${pathname} is not implemented in diagnostic version`,
      availableEndpoints: [
        '/api/health',
        '/api/listings/get-all-listings',
        '/api/listings/user-listings',
        '/api/listings/{id}',
        '/api/books',
        '/api/admin'
      ],
      timestamp: new Date().toISOString()
    }));
  } else {
    res.writeHead(200);
    res.end(JSON.stringify({
      message: 'Railway diagnostic server running',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    }));
  }
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`✓ Enhanced HTTP server running on port ${port}`);
  console.log(`✓ Sample data loaded: ${sampleListings.length} listings`);
  console.log('=== Diagnostic Complete ===');
});

server.on('error', (error) => {
  console.log('✗ Server error:', error.message);
  process.exit(1);
}); 