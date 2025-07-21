import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://yogupatil135:bSgSb5Zfq6nHQOTt@cluster0.ncluv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return; 
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Database connection failed');
  }
};

export default connectDB;