import express, { Router } from 'express';
import InvController from '../Controller/InventoryControllers';

class InventoryRouter {
    public router: Router;
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/inventory', InvController.inventory);
        // this.router.post('/createInventory', InvController.createInventory);
        // this.router.delete('/deletefindInventory', InvController.deletefindInventory);
    }

    getRouter(){
        return this.router;
    }
}

// Export an instance of the InventoryRouter
export default new InventoryRouter().getRouter();



