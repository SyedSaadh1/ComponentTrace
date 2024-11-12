import mongoose from "mongoose";
// const url = "mongodb://localhost:27030/ComponentTrace_db"
const url =
  "mongodb://devuser:devuser%402024%23@20.198.90.15:27030/componentTrace_db?authSource=admin";
// mongodb://devuser:devuser%402024%23@20.198.90.15:27030/
class Connect {
  async DBConnect() {
    try {
      mongoose.set("strictQuery", true);
      await mongoose.connect(url);
      console.log("Connected to DB Successfully");
    } catch (error) {
      console.log("Error connnecting to DB");
    }
  }
}

export default new Connect();
