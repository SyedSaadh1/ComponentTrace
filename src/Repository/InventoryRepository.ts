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
}

export default new InvRepository();