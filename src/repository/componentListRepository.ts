import componentModel, { IComponentList } from "../models/ComponentListModel"; // Adjust the import path as needed

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
}

export default new ComponentRepository();
