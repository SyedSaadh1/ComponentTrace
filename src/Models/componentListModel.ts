import mongoose, { Document, Schema } from "mongoose";

// Subcomponent interface
export interface SubComponent {
  componentIds: string[];
  componentName: string;
  quantity: number;
}

// Component list interface
export interface IComponentList extends Document {
  componentMasterId: string;
  createdBy: string;
  createdOn?: Date;
  currentOwner: string;
  qrCode?: string;
  sentToDelivery?: boolean;
  componentState?: string;
  componentId: string;
  subComponents: SubComponent[];
  componentName: string;
  wareHouseLocation?: string;
}

class ComponentModel {
  public model: mongoose.Model<IComponentList>;

  constructor() {
    // Define the schema
    const componentSchema: Schema<IComponentList> = new mongoose.Schema({
      componentMasterId: { type: String, required: true },
      createdBy: { type: String, default: "User123" },
      createdOn: { type: Date, default: Date.now },
      currentOwner: { type: String, default: "User123" },
      qrCode: { type: String },
      sentToDelivery: { type: Boolean, default: false },
      componentState: { type: String, default: "Available" },
      componentId: { type: String, required: true },
      componentName: { type: String, required: true },
      wareHouseLocation: { type: String },
      subComponents: {
        type: [
          {
            componentName: { type: String, required: true },
            componentIds: { type: [String], required: true },
            quantity: { type: Number, required: true },
          },
        ],
        default: [], // Ensures subComponents is an empty array by default
      },
    });

    // Prevent pluralization of collection name
    mongoose.pluralize(null);

    // Initialize the model
    this.model = mongoose.model<IComponentList>("componentList", componentSchema);
  }
}

export default new ComponentModel().model;
