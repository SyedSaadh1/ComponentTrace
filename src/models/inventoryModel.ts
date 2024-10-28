import mongoose, { Document, Schema } from 'mongoose';
import { v4 as po_Id } from 'uuid';

// Interface for order details
export interface Inventory extends Document {
    componentName: string; // ID of the component
    quantity: number;          // Quantity of the component  
    componentMasterId:string; // ComponentMasterId of the component
    userId:string;            // userId of the component
    stockStatus:string;       // stockstatus of the component 
}

class InventoryClass {
    public model: mongoose.Model<Inventory>;
   
    constructor() {
      const Inventoryschema:Schema<Inventory> = new mongoose.Schema({
        componentName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        componentMasterId: {
          type: String,
          required:true,
        },
        userId: {
            type: String,
            required:true,
        },
        stockStatus: {
            type: String,
            required:true,
        },
      });
      mongoose.pluralize(null);

      this.model = mongoose.model<Inventory>('Inventory', Inventoryschema);

    }
  }

// Exporting the InventoryDetails  model directly
export default new InventoryClass().model;