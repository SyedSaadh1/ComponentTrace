"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// const url = "mongodb://localhost:27030/ComponentTrace_db" 
const url = "mongodb://devuser:devuser%402024%23@20.198.90.15:27030/componentTrace_db?authSource=admin";
// mongodb://devuser:devuser%402024%23@20.198.90.15:27030/
class Connect {
    async DBConnect() {
        try {
            await mongoose_1.default.connect(url);
            console.log("Connected to Mongodb");
        }
        catch (error) {
            console.log("Error connnecting to db");
        }
    }
}
exports.default = new Connect();
