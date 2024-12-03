// Repository
import inventoryModel, { Inventory } from "../Models/InventoryModel";

class InvRepository {
  findAllInv(filter = {}) {
    return inventoryModel.aggregate([
      {
        $set: {
          quantity: { $subtract: ["$quantity", "$reserved"] },
        },
      },
    ]);
  }
  async findComponents(filter = {}) {
    try {
      const result = await inventoryModel.findOne(filter);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async updateQuantity(
    componentMasterId: string,
    newQuantity: number,
    userName: string
  ) {
    try {
      await inventoryModel.updateOne(
        { componentMasterId: componentMasterId, userName: userName },
        { $inc: { quantity: newQuantity } }
      );
    } catch (error) {
      throw error;
    }
  }
  createDoc(data: Partial<Inventory>, userName: string) {
    try {
      data.userName = userName;
      return inventoryModel.create(data);
    } catch (error) {
      throw error;
    }
  }
  async getAvailableQuantity(componentId: string) {
    const inventory = await inventoryModel.findOne({ componentId });
    return inventory ? inventory.quantity : 0;
  }

  // Get available quantity by componentMasterName
  async getAvailableQuantityByMasterName(componentMasterName: string) {
    try {
      const inventory = await inventoryModel.findOne({ componentMasterName });
      if (!inventory) {
        return null;
      }
      return inventory.quantity;
    } catch (error) {
      console.error("Error in getAvailableQuantityByMasterName:", error);
      throw new Error("Failed to fetch available quantity.");
    }
  }
}

export default new InvRepository();
