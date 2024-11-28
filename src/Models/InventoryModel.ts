import mongoose, { Document, Schema } from "mongoose";

//Model
//  Interface for Inventory details
export interface Inventory extends Document {
  componentMasterName: string; // ID of the component
  quantity: number; // Quantity of the component
  componentMasterId: string; // ComponentMasterId of the component
  userId: string; // userId of the component
  reserved: number; // stockstatus of the component
}

class InventoryClass {
  public model: mongoose.Model<Inventory>;

  constructor() {
    const Inventoryschema: Schema<Inventory> = new mongoose.Schema({
      componentMasterName: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      componentMasterId: {
        type: String,
        required: true,
      },
      userId: {
        type: String,
        required: true,
      },
      reserved: {
        type: Number,
        required: true,
      },
    });
    mongoose.pluralize(null);

    this.model = mongoose.model<Inventory>("Inventory", Inventoryschema);
  }
}

// Exporting the InventoryDetails  model directly
export default new InventoryClass().model;
