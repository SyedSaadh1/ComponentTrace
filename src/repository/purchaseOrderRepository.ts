import PurchaseOrder, { IPurchaseOrder } from "../models/purchaseOrder";

class PORepository {
  createPo(order: IPurchaseOrder) {
    return PurchaseOrder.create(order);
  }
  async getLastInsertedId() {
    try {
      return await PurchaseOrder.findOne().sort({ _id: -1 }).limit(1);
    } catch (error) {
      throw new Error(
        "Error Encountered while fetching last inserted Id : " + error
      );
    }
  }
}

export default new PORepository();
