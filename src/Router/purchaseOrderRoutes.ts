import express, { Router } from 'express';
import POController from '../Controller/purchaseOrderController';

class PurchaseOrderRouter {
    public router: Router;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/createPurchaseOrder', POController.createPurchaseOrder);
    }
}

// Export an instance of the PurchaseOrderRouter
export default new PurchaseOrderRouter();























































        // this.router.get('/findPurchaseOrder', POController.findPurchaseOrder);
                // this.router.delete('/deletePurchaseOrder', POController.deletePurchaseOrder);

