import mongoose from "mongoose";
 
const url = "mongodb://localhost:27017/ComponentTraceability"
class Connect {
    async DBConnect() {
        try {
            await mongoose.connect(url);
            console.log("Connected")
        } catch (error) {
            console.log("Error connnecting to db")
        }
    }
}
 
export default new Connect();