import componentModel, { IComponentList } from "../Models/componentListModel";

class ComponentRepository {
  /**
   * Find all components with an optional filter.
   * @param filter Optional filter object for querying components.
   */
  async findAllComponents(filter = {}): Promise<IComponentList[]> {
    try {
      return await componentModel.find(filter);
    } catch (error) {
      throw new Error(`Error fetching components: ${error}`);
    }
  }

  /**
   * Create a new component.
   * @param component Component object to be stored.
   */
  async storeComponent(component: IComponentList): Promise<IComponentList> {
    try {
      return await componentModel.create(component);
    } catch (error) {
      throw new Error(`Error creating component: ${error}`);
    }
  }

  /**
   * Update an existing component.
   * @param componentId ID of the component to update.
   * @param updateFields Fields to update.
   */
  async updateComponent(
    componentId: string,
    updateFields: Partial<IComponentList>
  ): Promise<any> {
    try {
      const result = await componentModel.updateOne(
        { componentId },
        { $set: updateFields }
      );
      return result;
    } catch (error) {
      throw new Error(`Error updating component: ${error}`);
    }
  }

  /**
   * Find components by name.
   * @param componentName Name of the component to find.
   */
  async findComponentByName(componentName: string): Promise<IComponentList[]> {
    try {
      return await componentModel.find({ componentName });
    } catch (error) {
      throw new Error(`Error finding component by name: ${error}`);
    }
  }

  /**
   * Get the last inserted component by its ID.
   */
  async getLastInsertedId(): Promise<IComponentList | null> {
    try {
      return await componentModel.findOne().sort({ _id: -1 }).limit(1);
    } catch (error) {
      throw new Error(
        `Error fetching last inserted component ID: ${error}`
      );
    }
  }

  /**
   * Find a component by its ID.
   * @param componentId ID of the component to find.
   */
  async findComponentById(componentId: string): Promise<IComponentList | null> {
    try {
      return await componentModel.findOne({ componentId });
    } catch (error) {
      throw new Error(`Error finding component by ID: ${error}`);
    }
  }

  /**
   * Add subcomponents to a parent component.
   * @param componentId ID of the parent component.
   * @param subComponents Array of subcomponent data to add.
   */
  async addSubComponents(
    componentId: string,
    subComponents: IComponentList["subComponents"]
  ): Promise<any> {
    try {
      return await componentModel.updateOne(
        { componentId },
        { $push: { subComponents: { $each: subComponents } } }
      );
    } catch (error) {
      throw new Error(`Error adding subcomponents: ${error}`);
    }
  }
}

export default new ComponentRepository();
