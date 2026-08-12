const mongoose = require("mongoose");

const DEFAULT_ATLAS_SRV =
  "mongodb+srv://ndsf999_db_user:bq8uTXpYuuuLfAhe@cluster0.vptojr2.mongodb.net/opportunity_bridge?retryWrites=true&w=majority&appName=Cluster0";

const DEFAULT_ATLAS_DIRECT =
  "mongodb://ndsf999_db_user:bq8uTXpYuuuLfAhe@cluster0-shard-00-00.vptojr2.mongodb.net:27017,cluster0-shard-00-01.vptojr2.mongodb.net:27017,cluster0-shard-00-02.vptojr2.mongodb.net:27017/opportunity_bridge?ssl=true&replicaSet=atlas-vp3q5z0-shard-0&authSource=admin&retryWrites=true&w=majority";

let memoryServer = null;

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI || DEFAULT_ATLAS_SRV;

    const isPlaceholder =
      !mongoUri ||
      mongoUri.includes("yourUsername") ||
      mongoUri.includes("user:password") ||
      mongoUri.includes("xxxxx");

    if (isPlaceholder) {
      mongoUri = DEFAULT_ATLAS_SRV;
    }

    try {
      // Primary Attempt: SRV URI with IPv4 forced (bypasses ISP DNS SRV restrictions)
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 8000,
        family: 4, // Force IPv4 to prevent querySrv ECONNREFUSED on Sri Lankan ISPs
      });
      console.log(`[Database] MongoDB Atlas Connected: ${conn.connection.host}`);
    } catch (primaryErr) {
      console.warn(`[Database Warning] Primary SRV Connection failed (${primaryErr.message}). Attempting direct node connection...`);
      try {
        // Secondary Attempt: Direct Node URI (bypasses SRV lookup entirely)
        const connDirect = await mongoose.connect(DEFAULT_ATLAS_DIRECT, {
          serverSelectionTimeoutMS: 8000,
          family: 4,
        });
        console.log(`[Database] MongoDB Atlas Direct Node Connected: ${connDirect.connection.host}`);
      } catch (directErr) {
        console.warn(`[Database Warning] Direct connection failed (${directErr.message}). Offline mode active.`);
      }
    }
  } catch (error) {
    console.error(`[Database Error] Connection handler error: ${error.message}`);
  }
};

module.exports = connectDB;
