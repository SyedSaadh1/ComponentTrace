import componentModel, { IComponentList } from "../Models/ComponentListModel"; 

class ComponentRepository {
  // Find all components with optional filter
  findAllComponents(filter = {}) {
    console.log("filter------")
    return componentModel.find(filter);
  }

  // Create new components
  storeComponents(components: IComponentList[]) {
    return componentModel.insertMany(components);
  }

  // Update existing components
  updateComponents(componentId: string, updateFields: Partial<IComponentList>) {
    return componentModel.updateOne({ componentId }, { $set: updateFields });
  }

  // Find component by name
  findCompByName(componentName: string) {
    return componentModel.find({ componentName });
  }
  async getLastInsertedId() {
    try {
      return await componentModel.findOne().sort({ _id: -1 }).limit(1);
    } catch (error) {
      throw new Error(
        "Error encountered while fetching last inserted ID for component list: " + error
      );
    }
  }
}

export default new ComponentRepository();
