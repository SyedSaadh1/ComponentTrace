"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const purchaseOrderSchemaValidation = joi_1.default.object({
    orderDetails: joi_1.default.array().items(joi_1.default.object({
        componentMasterName: joi_1.default.string().required(),
        quantity: joi_1.default.number().required(),
        expectedDate: joi_1.default.date().required(),
    })).required(),
    orderedTo: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    description: joi_1.default.string().optional(),
});
exports.default = purchaseOrderSchemaValidation;
