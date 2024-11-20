import inventoryModel, { Inventory } from "../Models/inventoryModel";

class InvRepository {
  async findAllInv(filter = {}): Promise<Inventory[]> {
    try {
      return await inventoryModel.aggregate([
        {
          $set: {
            quantity: { $subtract: ["$quantity", "$reserved"] },
          },
        },
      ]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error fetching inventory: ${error.message}`);
      }
      throw new Error("Unknown error occurred while fetching inventory.");
    }
  }

  async createInv(order: Inventory): Promise<Inventory> {
    try {
      return await inventoryModel.create(order);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error creating inventory: ${error.message}`);
      }
      throw new Error("Unknown error occurred while creating inventory.");
    }
  }

  async getAvailableQuantity(componentId: string): Promise<number> {
    try {
      const inventory = await inventoryModel.findOne({ componentId });
      return inventory ? inventory.quantity - (inventory.reserved || 0) : 0;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error fetching available quantity for ${componentId}: ${error.message}`);
      }
      throw new Error("Unknown error occurred while fetching available quantity.");
    }
  }

  async reserveStock(componentId: string, quantity: number): Promise<boolean> {
    try {
      const result = await inventoryModel.updateOne(
        { componentId, quantity: { $gte: quantity } },
        { $inc: { reserved: quantity } }
      );
      return result.modifiedCount > 0;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error reserving stock for ${componentId}: ${error.message}`);
      }
      throw new Error("Unknown error occurred while reserving stock.");
    }
  }
}

export default new InvRepository();
