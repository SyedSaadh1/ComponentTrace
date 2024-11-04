import { strict } from "assert";
import mongoose, { Document, Schema } from "mongoose";

//interface for component Summary

export interface componentsSummary extends Document {
  componentMasterId: string;
  quantity: number;
  batchNo: string;
}

// Interface for transaction
export interface ITransactions extends Document {
  componentIds: [];
  componentsSummary: componentsSummary[];
  from: string;
  to: string;
  sentDate: Date;
  receivedDate: Date;
  grnNumber: string;
}

// Class for transaction
class transactionClass {
  public transactionsModel: mongoose.Schema<ITransactions>;
  constructor() {
    this.transactionsModel = new mongoose.Schema({
      componentIds: { type: [String], required: true },
      componentsSummary: {
        type: [
          {
            componentMasterId: { type: String, required: true },
            quantity: { type: Number, required: true },
            batchNo: { type: String, required: true },
          },
        ],
        required: true,
      },
      from: { type: String, required: true },
      to: { type: String, required: true },
      sentDate: { type: Date, required: true, default: Date.now },
      receivedDate: { type: Date, required: true, default: Date.now },

      grnNumber: { type: String, required: true },
    });
  }
  getModel() {
    mongoose.pluralize(null);
    return mongoose.model<ITransactions>(
      "Transactions",
      this.transactionsModel
    );
  }
}

// Exporting the transaction model directly
export default new transactionClass().getModel();
