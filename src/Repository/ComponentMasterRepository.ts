import ComponentMasterModel, {
  IComponentMaster,
} from "../Model/ComponentMasterModel";

class ComponentMasterRepository {
  async findAll(filter = {}) {
    try {
      return await ComponentMasterModel.find(filter);
    } catch (error) {
      throw new Error("Error Retrieving Component Masters " + error);
    }
  }
  async createComponentMaster(Data: IComponentMaster) {
    try {
      return await ComponentMasterModel.insertMany(Data);
    } catch (error) {
      throw new Error("Error Creating Component Masters " + error);
    }
  }
  async updateComponentMaster(ComponentMasterName: string) {}
}

export default new ComponentMasterRepository();
