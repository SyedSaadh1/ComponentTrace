import mongoose, { Document, Schema, Model } from "mongoose";

// Interface defining Batch details
export interface Batch extends Document {
  batchNo: string;
  componentName: string;
  componentIds: string[];
  createdBy: string;
  finishedDate?: Date;
}

class BatchClass {
  private batchSchema: mongoose.Schema<Batch>;

  constructor() {
    this.batchSchema = new mongoose.Schema(
      {
        batchNo: {
          type: String,
          required: true,
        },
        componentName: {
          type: String,
          required: true,
        },
        componentIds: {
          type: [String], // Array of strings
          required: true,
        },
        createdBy: {
          type: String,
          required: true,
        },
      
        finishedDate: {
          type: Date, // Optional, no default
        },
      },
      {
        timestamps: true,
      }
    );
  }

  getModel() {
    mongoose.pluralize(null); // Prevent automatic pluralization of the model name
    return mongoose.model<Batch>("Batch", this.batchSchema);
  }
}

export default new BatchClass().getModel();
