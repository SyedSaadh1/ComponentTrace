import PurchaseOrder,{ IPurchaseOrder } from "../Models/purchaseOrder";



class PORepository {
  
  createPo(order: IPurchaseOrder) {
    return PurchaseOrder.create(order);
  }
  
}

export default new PORepository();