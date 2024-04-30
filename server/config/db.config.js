import dotenv from 'dotenv';
dotenv.config(); // This loads variables from .env into process.env
import mongoose from 'mongoose';
console.log('MongoDB URI:', process.env.MONGO_URI); // This will show the actual URI used

// This function connects to the MongoDB database using the URI from the .env file
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected : ${connect.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
