import { strict } from "assert";
import mongoose, { Document, Schema } from "mongoose";

//interface for component Summary

export interface componentsSummary extends Document {
  componentMasterId: string;
  componentIds: [];
  quantity: number;
}

// Interface for transaction
export interface ITransactions extends Document {
  transactionId: string;
  grnNumber: string;
  poId: string;
  componentsSummary: componentsSummary[];
  from: string;
  to: string;
  sentDate: Date;
  receivedDate: Date;
  receievedByCustomer: boolean;
}

// Class for transaction
class TransactionClass {
  public transactionsModel: mongoose.Schema<ITransactions>;
  constructor() {
    this.transactionsModel = new mongoose.Schema({
      transactionId: { type: String, required: true },
      poId: { type: String, required: true },
      componentsSummary: {
        type: [
          {
            componentMasterId: { type: String, required: true },
            quantity: { type: Number, required: true },
            componentIds: { type: [String], required: true },
          },
        ],
        required: true,
      },
      from: { type: String, required: true },
      to: { type: String, required: true },
      sentDate: { type: Date, required: true, default: Date.now },
      receivedDate: { type: Date, required: true, default: Date.now },
      receievedByCustomer: { type: Boolean, required: false, default: true },
      grnNumber: { type: String, default: "GRN-00X" },
    });
  }
  getModel() {
    mongoose.pluralize(null);
    return mongoose.model<ITransactions>(
      "TransactionsModel",
      this.transactionsModel
    );
  }
}

// Exporting the transaction model directly
export default new TransactionClass().getModel();
