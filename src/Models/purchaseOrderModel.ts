import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; 

// Interface for order details
export interface OrderItemsDetails extends Document {
  componentMasterId: string;
  componentMasterName: string;
  quantity: number;
  expectedDate: Date;
}

// Interface for purchase orders
export interface IPurchaseOrder extends Document {
  orderDetails: OrderItemsDetails[];
  orderedTo: string;
  orderedDate: Date;
  address: string;
  description: string;
  poId: string;
}

// Class for Purchase Order Schema
class PurchaseOrderClass {
  private PurchaseOrderSchema: Schema<IPurchaseOrder>

  constructor() {

    this.PurchaseOrderSchema = new mongoose.Schema({
      poId: {
        type: String,
        required: true,

      },
      orderDetails: {
        type: [{
          componentMasterId: {
            type: String,
            required: true,
          },
          componentMasterName: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          expectedDate: {
            type: Date,
            required: true,
          }

        }], required: true
      }, // Reference to order detail schema
      orderedTo: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },

    });

    // Ensure pluralization is disabled
    mongoose.pluralize(null);

    // Create the model from the schema

  }
  getModel() {
    return mongoose.model<IPurchaseOrder>('PurchaseOrder', this.PurchaseOrderSchema);
  }
}

// Exporting the Purchase Order model
export default new PurchaseOrderClass().getModel();
