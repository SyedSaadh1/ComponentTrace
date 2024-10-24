"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inventoryModel_1 = __importDefault(require("../models/inventoryModel"));
class InvRepository {
    findAllInv(filter = {}) {
        return inventoryModel_1.default.find(filter);
    }
    createInv(order) {
        return inventoryModel_1.default.create(order);
    }
}
exports.default = new InvRepository();
