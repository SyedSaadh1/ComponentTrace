import mongoose from "mongoose";
const url = "mongodb://localhost:27017/ComponentMaster";

class Connection {
  async connect() {
    mongoose.pluralize(null);
    mongoose.set("strictQuery", true);
    try {
      await mongoose.connect(url);
      console.log("DB Connection Established Successfully");
    } catch (error) {
      console.error("Connecting DB Encountered an Error : " + error);
    }
  }
}
export default new Connection();
