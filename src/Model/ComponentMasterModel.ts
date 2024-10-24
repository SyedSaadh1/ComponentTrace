import mongoose, { Document, ObjectId } from "mongoose";
import { randomUUID } from "crypto";
import { Session } from "inspector";
export interface Components {
  componentName: string;
  quantity: number;
}
export interface IComponentMaster extends Document {
  _id: ObjectId;
  componentMasterId: string;
  componentMasterName: string;
  componentDescription: string;
  category: string;
  components: Components[];
  quantity: number;
  createdBy: string;
  createdOn: Date;
  updatedOn: Date;
}
class ComponentMasterModel {
  private componentMasterModel: mongoose.Schema<IComponentMaster>;
  constructor() {
    this.componentMasterModel = new mongoose.Schema({
      componentMasterId: { type: String, default: randomUUID },
      componentMasterName: { type: String, required: true },
      componentDescription: { type: String, required: false },
      category: { type: String, required: true },
      components: {
        type: [
          {
            componentName: { type: String },
            quantity: { type: Number },
          },
        ],
        required: false,
      },
      quantity: { type: Number, required: true },
      createdBy: { type: String, required: true },
      createdOn: { type: Date, default: Date.now() },
      updatedOn: { type: Date, default: Date.now() },
    });
  }
  getModel() {
    return mongoose.model<IComponentMaster>(
      "ComponentMaster",
      this.componentMasterModel
    );
  }
}

export default new ComponentMasterModel().getModel();
