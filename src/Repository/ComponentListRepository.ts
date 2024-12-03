import componentModel, { IComponentList } from "../Models/ComponentListModel";

class ComponentRepository {
  findLatestBatchId() {
    throw new Error("Method not implemented.");
  }
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
  async getComponentIds(itemData: any, userName: string) {
    try {
      const componentMasterId: string = itemData.componentMasterId;
      const quantity: number = itemData.quantity;
      const componentIds: any = [];
      const ids = await componentModel
        .find(
          {
            componentMasterId: componentMasterId,
            sentToDelivery: false,
          },
          { componentId: 1, _id: 0 }
        )
        .limit(quantity);
      ids.forEach((id) => componentIds.push(id.componentId));

      await componentModel.updateMany(
        {
          componentId: { $in: componentIds },
        },
        { $set: { sentToDelivery: true } }
      );
      return componentIds;
    } catch (error) {
      console.log("Error fetching componentIds: " + error);
    }
  }
}

export default new ComponentRepository();
