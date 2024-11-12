import ComponentMasterModel, {
  IComponentMaster,
} from "../Models/ComponentMasterModel";

class ComponentMasterRepository {
  async find(filter = {}, p0?: { componentMasterId: number }) {
    try {
      return await ComponentMasterModel.find(filter);
    } catch (error) {
      throw new Error("Error Retrieving Component Masters " + error);
    }
  }
  async getNonFPComponents() {
    try {
      return await ComponentMasterModel.find({ isFinalProduct: false });
    } catch (error) {
      throw new Error("Error Retrieving Non-FP-Components " + error);
    }
  }
  async getSubComponents(componentMasterId: string) {
    try {
      return await ComponentMasterModel.find(
        { componentMasterId: componentMasterId },
        { components: 1, _id: 0 }
      );
    } catch (error) {
      throw new Error("Error Retrieving Sub-Components");
    }
  }
  async createComponentMaster(Data: IComponentMaster) {
    try {
      return await ComponentMasterModel.create(Data);
    } catch (error) {
      throw new Error("Error Creating Component Masters " + error);
    }
  }
  async updateComponentMaster(Data: IComponentMaster) {
    return await ComponentMasterModel.updateOne(
      {
        _id: Data._id,
      },
      {
        $set: {
          componentMasterName: Data.componentMasterName,
          category: Data.category,
          componentDescription: Data.componentDescription,
          components: Data.components,
          isFinalProduct: Data.isFinalProduct,
        },
      }
    );
  }
  async getLastInsertedId() {
    try {
      return await ComponentMasterModel.findOne().sort({ _id: -1 }).limit(1);
    } catch (error) {
      throw new Error(
        "Error Encountered while fetching last inserted Id : " + error
      );
    }
  }
}

export default new ComponentMasterRepository();
