import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url =
  "mongodb://devuser:devuser%402024%23@20.198.90.15:27030/componentTrace_db?authSource=admin";
class Connection {
  async connect() {
    // Disable pluralization of model names
    mongoose.set("strictQuery", true); // Set strict query to true
    try {
      await mongoose.connect(url);
      // mongoose.pluralize(null);
      console.log("DB Connection Established Successfully");
    } catch (error) {
      console.error("Connecting DB Encountered an Error: " + error);
    }
  }
}

export default new Connection();
