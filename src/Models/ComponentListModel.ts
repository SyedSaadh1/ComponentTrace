import mongoose, { Document, Schema } from "mongoose";
import qrcode from "qrcode";

export interface subComponents {
  componentIds: string[];
  componentName: string;
  quantity: number;
}

export interface IComponentList extends Document {
  componentId: string;
  componentName: string;
  componentMasterId: string;
  createdBy: string;
  createdOn: Date;
  currentOwner: string;
  qrCode: string;
  sentToDelivery: boolean;
  componentState: string;
  subComponents: subComponents[];
  wareHouseLocation?: string;
  // batchNo: string;
}

class ComponentModel {
  public model: mongoose.Model<IComponentList>;

  constructor() {
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
      // batchNo: { type: String, required: true },
      subComponents: {
        type: [
          {
            componentName: { type: String, required: true },
            componentIds: { type: [String], required: true },
            quantity: { type: Number, required: true },
          },
        ],
        default: [],
      },
    });

    mongoose.pluralize(null);

    this.model = mongoose.model<IComponentList>(
      "componentList",
      componentSchema
    );
  }
}

export default new ComponentModel().model;
