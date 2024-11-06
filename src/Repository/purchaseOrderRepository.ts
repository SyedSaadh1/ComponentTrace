import purchaseOrderModel from "../Models/purchaseOrderModel";
import PurchaseOrder, { IPurchaseOrder } from "../Models/purchaseOrderModel";



class PORepository {
  async getLastInsertedId() {
    try {
      return await purchaseOrderModel.findOne().sort({ _id: -1 }).limit(1);
    } catch (error) {
      throw new Error(
        "Error Encountered while fetching last inserted Id : " + error
      );
    }
  }

  async createPo(order: IPurchaseOrder) {
    return await PurchaseOrder.create(order);
  }

}

export default new PORepository();