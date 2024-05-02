// testSetup.js
require('dotenv').config(); // Load environment variables

process.env.MONGO_URI = process.env.TEST_MONGO_URI; // Override the MONGO_URI

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongoServer.getUri();
});

afterAll(async () => {
  if (mongoose.connection.readyState) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});
