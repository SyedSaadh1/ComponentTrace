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
  createInv(order: Inventory) {
    return inventoryModel.create(order);
  }
  async getAvailableQuantity(componentId: string): Promise<number> {
    const inventory = await inventoryModel.findOne({ componentId });
    return inventory ? inventory.quantity : 0;
  }

  // Get available quantity by componentMasterName
  async getAvailableQuantityByMasterName(componentMasterName: string): Promise<number | null> {
    try {
      const inventory = await inventoryModel.findOne({ componentMasterName });
      if (!inventory) {
        return null; 
      }
      return inventory.quantity - inventory.reserved;
    } catch (error) {
      console.error("Error in getAvailableQuantityByMasterName:", error);
      throw new Error("Failed to fetch available quantity.");
    }
  }
}

export default new InvRepository();
