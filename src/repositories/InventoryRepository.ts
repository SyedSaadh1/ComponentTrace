
import inventoryModel, { Inventory } from "../models/inventoryModel";


class InvRepository {
  findAllInv(filter = {}) {
    return inventoryModel.find(filter);
  }
  createInv(order: Inventory) {
    return inventoryModel.create(order);
  }
}

export default new InvRepository();