import express, { Router } from "express";
import POController from "../Controller/PurchaseOrderController";

class PurchaseOrderRouter {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/", POController.createPurchaseOrder);
    this.router.get("/", POController.findOrders);
  }
  getRouter() {
    return this.router;
  }
}

// Export an instance of the PurchaseOrderRouter
export default new PurchaseOrderRouter().getRouter();

// this.router.get('/findPurchaseOrder', POController.findPurchaseOrder);
// this.router.delete('/deletePurchaseOrder', POController.deletePurchaseOrder);
