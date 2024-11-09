// Repository
import inventoryModel, { Inventory } from "../Models/inventoryModel";


class InvRepository {
  findAllInv(filter = {}) {
    return inventoryModel.aggregate([
      { $match: filter },  
      {
        $set: {
          quantity: { $subtract: ["$quantity", "$reserved"] } // Update quantity by subtracting reserved
        }
      }
    ]);
  }
  createInv(order: Inventory) {
    return inventoryModel.create(order);
  }
}

export default new InvRepository();