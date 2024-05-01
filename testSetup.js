// Using ES6 import statements
// This file is used to setup the test environment

// Import the dotenv module
import dotenv from 'dotenv';
dotenv.config();

// Import the mongoose module
import mongoose from 'mongoose';
// Import the MongoMemoryServer module
import { MongoMemoryServer } from 'mongodb-memory-server';

// Override the MONGO_URI
process.env.MONGO_URI = process.env.TEST_MONGO_URI;

// Create a variable to store the MongoMemoryServer instance
let mongoServer;

// Create a beforeAll hook to create the MongoMemoryServer instance
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
