import mongoose, { ObjectId } from "mongoose";

export interface IComponentMaster {
  _id: ObjectId;
  componentMasterName: String;
  componentMasterDescription: String;
  componentMasterImage: String;
  category: String;
  quantity: Number;
  productionStatus: String;
  createdBy: String;
  createdOn: Date;
  updatedBy: String;
  updatedOn: Date;
}
