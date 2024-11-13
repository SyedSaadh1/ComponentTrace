// Repository
import inventoryModel, { Inventory } from "../Models/inventoryModel";


class InvRepository {
  findAllInv(filter = {}) {
    return inventoryModel.aggregate([
      {
        $set: {
          quantity: { $subtract: ["$quantity", "$reserved"] } 
        }
      }
    ]);
  }

  createInv(order: Inventory) {
    return inventoryModel.create(order);
  }

  async getAvailableQuantity(componentId: string): Promise<number> {
    const inventory = await inventoryModel.findOne({ componentId });
    return inventory ? inventory.quantity : 0;
  }

  async updateQuantity(componentMasterId: string, change: number): Promise<void> {
    await inventoryModel.updateOne(
      { componentMasterId },
      { $inc: { quantity: change } }
    );
  }
}

export default new InvRepository();
