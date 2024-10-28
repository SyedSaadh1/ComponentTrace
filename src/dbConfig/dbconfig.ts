import mongoose from 'mongoose';
 
export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://devuser:devuser%402024%23@20.198.90.15:27030/componentTrace_db?authSource=admin");
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // Exit the process with failure
  }
};