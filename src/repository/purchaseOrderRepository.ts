import PurchaseOrder,{ IPurchaseOrder } from "../models/purchaseOrderModel";



class PORepository {
  
  createPo(order: IPurchaseOrder) {
    return PurchaseOrder.create(order);
  }
  
}

export default new PORepository();