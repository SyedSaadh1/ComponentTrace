import PurchaseOrder,{ IPurchaseOrder } from "../models/purchaseOrderModel";



class PORepository {
  getLastInsertedId() {
    return {poId : "PO-099"}
    throw new Error("Method not implemented.");
  }
  
  createPo(order: IPurchaseOrder) {
    return PurchaseOrder.create(order);
  }
  
}

export default new PORepository();