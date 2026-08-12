const mongoose = require("mongoose");

const DEFAULT_ATLAS_URI =
  "mongodb+srv://ndsf999_db_user:bq8uTXpYuuuLfAhe@cluster0.vptojr2.mongodb.net/opportunity_bridge?retryWrites=true&w=majority&appName=Cluster0";

let memoryServer = null;

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI || DEFAULT_ATLAS_URI;

    // Check if MONGO_URI is missing or contains placeholder text
    const isPlaceholder =
      !mongoUri ||
      mongoUri.includes("yourUsername") ||
      mongoUri.includes("user:password") ||
      mongoUri.includes("xxxxx");

    if (isPlaceholder) {
      mongoUri = DEFAULT_ATLAS_URI;
    }

    try {
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 8000,
      });
      console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    } catch (atlasErr) {
      console.warn(`[Database Warning] MongoDB Atlas connection failed (${atlasErr.message}). Attempting fallback memory server...`);
      try {
        const { MongoMemoryServer } = require("mongodb-memory-server");
        memoryServer = await MongoMemoryServer.create();
        const fallbackUri = memoryServer.getUri();
        const conn = await mongoose.connect(fallbackUri);
        console.log(`[Database] In-Memory MongoDB Connected: ${conn.connection.host}`);
      } catch (memErr) {
        console.error(`[Database Error] Fallback memory server initialization failed: ${memErr.message}`);
      }
    }
  } catch (error) {
    console.error(`[Database Error] Connection error: ${error.message}`);
  }
};

module.exports = connectDB;
