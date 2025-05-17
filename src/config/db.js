const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use MongoDB Atlas connection string from .env file or fall back to localhost
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://photofinealbums:Photofine2511@cluster01.jyg2mwu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01';
    
    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 