import mongoose from "mongoose";

const url =
  "mongodb://devuser:devuser%402024%23@20.198.90.15:27030/componentTrace_db?authSource=admin";
class Connect {
  async DBConnect() {
    try {
      mongoose.set("strictQuery", true);
      await mongoose.connect(url);
      console.log("Connected");
    } catch (error) {
      console.log("Error connnecting to db");
    }
  }
}

export default new Connect();
