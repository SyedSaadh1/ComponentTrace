"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InventoryControllers_1 = __importDefault(require("../controllers/InventoryControllers"));
class InventoryRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/findInventory', InventoryControllers_1.default.findInventory);
        this.router.post('/createInventory', InventoryControllers_1.default.createInventory);
        // this.router.delete('/deletefindInventory', InvController.deletefindInventory);
    }
}
// Export an instance of the InventoryRouter
exports.default = new InventoryRouter();
