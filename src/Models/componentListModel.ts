import mongoose, { Document, Schema } from "mongoose";

// Interface for component details
export interface IComponentList extends Document {
  componentMasterId: string; // Master ID of the component
  createdBy: string; // User who created the component
  createdOn?: Date; // Date of creation
  currentOwner: string; // Current owner of the component
  qrCode?: string; // QR code for the component
  sentToDelivery?: boolean; // Delivery status
  componentState?: string; // Assigning/ Assembling/ Available/ Service/ Scrap/ Sent to Delivery
  componentId: string; // Unique component ID
  componentName: string; // Name of the component
  wareHouseLocation?: string; // Location in the warehouse
}

class ComponentModel {
  public model: mongoose.Model<IComponentList>;

  constructor() {
    const componentSchema: Schema<IComponentList> = new mongoose.Schema({
      componentMasterId: {
        type: String,
        required: true,
      },
      createdBy: {
        type: String,
        default: "User123",
      },
      createdOn: {
        type: Date,
        default: Date.now, // Default to current date
      },
      currentOwner: {
        type: String,
        default: "User123",
      },
      qrCode: {
        type: String,
      },
      sentToDelivery: {
        type: Boolean,
        default: false, // Default to false
      },
      componentState: {
        type: String,
        default: "Available",
      },
      componentId: {
        type: String,
        required: true,
      },
      componentName: {
        type: String,
        required: true,
      },
      wareHouseLocation: {
        type: String,
      },
    
    });

    mongoose.pluralize(null); // Disable pluralization of model name

    this.model = mongoose.model<IComponentList>(
      "componentList",
      componentSchema
    ); // Use appropriate model name
  }
}

// Exporting the Component model directly
export default new ComponentModel().model;
