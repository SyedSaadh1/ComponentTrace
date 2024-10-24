"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InventoryRepository_1 = __importDefault(require("../repositories/InventoryRepository"));
class InvController {
    async findInventory(req, res) {
        try {
            const result = await InventoryRepository_1.default.findAllInv();
            res.json(result);
        }
        catch (error) {
            res.json("Error : " + error);
        }
    }
    async createInventory(req, res) {
        try {
            const result = await InventoryRepository_1.default.createInv(req.body);
            res.json(result);
        }
        catch (error) {
            res.json("Error in creating : " + error);
        }
    }
}
exports.default = new InvController();
