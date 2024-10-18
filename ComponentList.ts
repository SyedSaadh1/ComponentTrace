import mongoose from "mongoose";
mongoose.pluralize(null);


// Define the schema for the collection
const ComponentListSchema = new mongoose.Schema({
  componentMasterId: { type: Number, required: true },
  createdBy: { type:String, required: true },
  createdOn: { type: String},
  currentOwner: { type: String,required: true },
  qrCode: { type: String },
  sentToDelivery: { type: Boolean, default: false },
  componentId: { type: String, required: true, unique: true },
  componentName: { type: String, required: true },
  wareHouseLocation: { type: String }
});

// Export the model
export const ComponentModel=mongoose.model("components",ComponentListSchema);
