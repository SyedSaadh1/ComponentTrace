"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class InventoryClass {
    constructor() {
        const Inventoryschema = new mongoose_1.default.Schema({
            componentName: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            componentMasterId: {
                type: String,
                required: true,
            },
            userId: {
                type: String,
                required: true,
            },
            stockStatus: {
                type: String,
                required: true,
            },
        });
        mongoose_1.default.pluralize(null);
        this.model = mongoose_1.default.model('InventoryDetails', Inventoryschema);
    }
}
// Exporting the InventoryDetails  model directly
exports.default = new InventoryClass().model;
