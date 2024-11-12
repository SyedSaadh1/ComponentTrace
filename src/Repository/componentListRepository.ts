import componentModel, { IComponentList } from "../Models/componentListModel";

class ComponentRepository {
  // Find all components with optional filter

  findAllComponents(filter = {}) {
    console.log("filter------");

    return componentModel.find(filter);
  }

  // Create a new component

  storeComponents(component: IComponentList) {
    return componentModel.create(component); // Use `create` to accept a single object
  }

  // Update existing components

  updateComponents(componentId: string, updateFields: Partial<IComponentList>) {
    return componentModel.updateOne({ componentId }, { $set: updateFields });
  }

  // Find component by name

  findCompByName(componentName: string) {
    return componentModel.find({ componentName });
  }

  // Get last inserted component ID

  async getLastInsertedId() {
    try {
      return await componentModel.findOne().sort({ _id: -1 }).limit(1);
    } catch (error) {
      throw new Error(
        "Error encountered while fetching last inserted ID for component list: " +
          error
      );
    }
  }
}

export default new ComponentRepository();
