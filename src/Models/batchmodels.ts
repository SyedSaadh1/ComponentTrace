import mongoose, { Document, Schema } from 'mongoose';

// Interface for Batch details
export interface Batch extends Document {
  batchNo: string;                  // Batch number
  componentDetails: string;         // Details of products and their quantities
  createdBy: string;                // UserId who created this batch
  startedDate: Date;                // Start date of the batch
  finishedDate: Date;               // Finished date of the batch
}

class BatchClass {
  public model: mongoose.Model<Batch>;

  constructor() {
    const BatchSchema: Schema<Batch> = new mongoose.Schema({
      batchNo: {
        type: String,
        required: true,
      },
      componentDetails: {
        type: String,
        required: true,
      },
      createdBy: {
        type: String,
        required: true,
      },
      startedDate: {
        type: Date,
        default: Date.now,
        required: true,
      },
      finishedDate: {
        type: Date,
        default: Date.now,
        required: true,
      },
    });

    mongoose.pluralize(null); // Prevents Mongoose from pluralizing the model name
    this.model = mongoose.model<Batch>('Batch', BatchSchema);
  }
}

// Exporting the Batch model directly
export default new BatchClass().model;
