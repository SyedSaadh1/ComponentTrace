import ComponentMasterModel, {
  IComponentMaster,
} from "../Model/ComponentMasterModel";

class ComponentMasterRepository {
  async find(filter = {}) {
    try {
      return await ComponentMasterModel.find(filter);
    } catch (error) {
      throw new Error("Error Retrieving Component Masters " + error);
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
          quantity: Data.quantity,
          category: Data.category,
          componentDescription: Data.componentDescription,
          components: Data.components,
          updatedOn: Date.now(),
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
