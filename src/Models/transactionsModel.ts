import { strict } from "assert";
import { required } from "joi";
import mongoose, { Document, Schema } from "mongoose";

//interface for component Summary

export interface components extends Document {
  componentMasterId: string;
  componentMasterName: string;
  componentIds: [];
  quantity: number;
}

// Interface for transaction
export interface ITransactions extends Document {
  transactionId: string;
  grnNumber: string;
  poId: string;
  componentsSummary: string;
  componentsDetails: components[];
  from: string;
  to: string;
  sentDate: Date;
  receivedDate: Date;
  receievedByCustomer: boolean;
  createAt: Date;
  updatedAt: Date;
  transactionStatus: string;
}

// Class for transaction
class TransactionClass {
  public transactionsModel: mongoose.Schema<ITransactions>;
  constructor() {
    this.transactionsModel = new mongoose.Schema(
      {
        transactionId: { type: String, required: true },
        poId: { type: String, required: true },
        componentsSummary: { type: String, required: true },
        componentsDetails: {
          type: [
            {
              componentMasterId: { type: String, required: true },
              componentMasterName: { type: String, required: true },
              quantity: { type: Number, required: true },
              componentIds: { type: [String], required: true },
            },
          ],
          required: true,
        },

        from: { type: String, required: true },
        to: { type: String, required: true },
        sentDate: { type: Date, required: true, default: Date.now },
        receivedDate: { type: Date, required: false },
        receievedByCustomer: { type: Boolean, required: false },
        grnNumber: { type: String, required: false },
        transactionStatus: {
          type: String,
          required: true,
          default: "Sent For Delivery",
        },
      },
      { timestamps: true }
    );
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
