"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const componentMasterSchemaValidate = joi_1.default.object({
    componenMasterId: joi_1.default.string().optional(),
    componentMasterName: joi_1.default.string().required(),
    componentMasterDescription: joi_1.default.string().optional(),
    category: joi_1.default.string().required(),
    quantity: joi_1.default.number().required(),
    components: joi_1.default.array()
        .items(joi_1.default.object({
        componentMasterName: joi_1.default.string().required(),
        quantity: joi_1.default.number().required(),
    }))
        .optional(),
    createdBy: joi_1.default.string().optional(),
});
exports.default = componentMasterSchemaValidate;
