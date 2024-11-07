import mongoose, { Document } from "mongoose";
export interface Components {
  componentMasterId: string;
  componentMasterName: string;
  quantity: number;
}
export interface IComponentMaster extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  componentMasterId: string;
  componentMasterName: string;
  componentDescription: string;
  category: string;
  components: Components[];
  isFinalProduct: boolean;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}
class ComponentMasterModel {
  private componentMasterModel: mongoose.Schema<IComponentMaster>;
  constructor() {
    this.componentMasterModel = new mongoose.Schema(
      {
        componentMasterId: { type: String, default: "CM-00X" },
        componentMasterName: { type: String, required: true },
        componentDescription: { type: String, required: false },
        category: { type: String, required: true },
        components: {
          type: [
            {
              componentMasterId: { type: String, required: true },
              componentMasterName: { type: String, required: true },
              quantity: { type: Number, required: true },
            },
          ],
          required: false,
        },
        isFinalProduct: { type: Boolean, required: true },
        createdBy: { type: String, default: "User123" },
      },
      {
        timestamps: true,
      }
    );
  }

  getModel() {
    mongoose.pluralize(null);

    return mongoose.model<IComponentMaster>(
      "ComponentMasterModel",
      this.componentMasterModel
    );
  }
}

export default new ComponentMasterModel().getModel();
