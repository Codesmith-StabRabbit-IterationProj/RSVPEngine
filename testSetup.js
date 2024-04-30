// Using ES6 import statements
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// Override the MONGO_URI
process.env.MONGO_URI = process.env.TEST_MONGO_URI;

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
