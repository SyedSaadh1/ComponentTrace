import mongoose from "mongoose";
 
// const url = "mongodb://localhost:27030/ComponentTrace_db"
const url = "mongodb://devuser:devuser%402024%23@20.198.90.15:27030/componentTrace_db?authSource=admin";
// mongodb://devuser:devuser%402024%23@20.198.90.15:27030/
class Connect {
    async DBConnect() {
        try {
            await mongoose.connect(url);
            console.log("Connected to Mongodb")
        } catch (error) {
            console.log("Error connnecting to db")
        }
    }
}
 
export default new Connect();