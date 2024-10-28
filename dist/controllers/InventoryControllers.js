"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InventoryRepository_1 = __importDefault(require("../repositories/InventoryRepository"));
class InvController {
    //get
    async findInventory(req, res) {
        try {
            const result = await InventoryRepository_1.default.findAllInv();
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json("Error : " + error);
        }
    }
    // post 
    async createInventory(req, res) {
        try {
            const result = await InventoryRepository_1.default.createInv(req.body);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json("Error in creating : " + error);
        }
    }
}
exports.default = new InvController();
