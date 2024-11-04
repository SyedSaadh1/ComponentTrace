"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ComponentMasterRepository_1 = __importDefault(require("../dist/Repository/ComponentMasterRepository"));
const purchaseOrderRepository_1 = __importDefault(require("../dist/Repository/purchaseOrderRepository"));
class AutogenerateId {
    async idGenerate() {
        const lastInsertedCMId = await ComponentMasterRepository_1.default.getLastInsertedId();
        console.log(lastInsertedCMId);
        if (lastInsertedCMId) {
            const id = lastInsertedCMId.componentMasterId;
            const prefix = id.slice(0, 4);
            let sequence = parseInt(id.slice(4));
            sequence++;
            console.log(prefix + sequence);
            return prefix + sequence.toString().padStart(2, "0");
        }
        else {
            const prefix = "CM-0";
            const sequence = 1;
            return prefix + sequence.toString().padStart(2, "0");
        }
    }
    async poIdGenerate() {
        const lastInsertedPOId = await purchaseOrderRepository_1.default.getLastInsertedId();
        console.log(lastInsertedPOId);
        if (lastInsertedPOId) {
            const id = lastInsertedPOId.poId;
            const prefix = id.slice(0, 4);
            let sequence = parseInt(id.slice(4));
            sequence++;
            console.log(prefix + sequence);
            return prefix + sequence.toString().padStart(2, "0");
        }
        else {
            const prefix = "PO-0";
            const sequence = 1;
            return prefix + sequence.toString().padStart(2, "0");
        }
    }
}
exports.default = new AutogenerateId();
