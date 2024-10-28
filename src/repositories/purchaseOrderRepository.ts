import PurchaseOrder,{ IPurchaseOrder } from "../models/purchaseOrder";



class PORepository {
  
  createPo(order: IPurchaseOrder) {
    return PurchaseOrder.create(order);
  }
  
}

export default new PORepository();