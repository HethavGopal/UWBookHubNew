const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

// Setup database connection for testing
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// Clean up database after each test
afterEach(async () => {
  const collections = mongoose.connection.collections;
  
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

// Close database connection after all tests
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

// Global test utilities
global.testUtils = {
  createMockUser: () => ({
    uid: 'test-uid-123',
    email: 'test@uwaterloo.ca',
    emailVerified: true,
    name: 'Test User'
  }),
  
  createMockListing: () => ({
    title: 'Test Item',
    description: 'This is a test item description',
    price: 99.99,
    category: 'electronics',
    condition: 'good',
    email: 'test@uwaterloo.ca',
    status: 'active'
  }),
  
  createMockRequest: (overrides = {}) => ({
    user: global.testUtils.createMockUser(),
    body: {},
    params: {},
    query: {},
    ip: '127.0.0.1',
    get: jest.fn().mockReturnValue('test-user-agent'),
    ...overrides
  }),
  
  createMockResponse: () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  }
}; 