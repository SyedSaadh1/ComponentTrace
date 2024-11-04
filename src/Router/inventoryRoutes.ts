import express, { Router } from 'express';
import InvController from '../Controller/InventoryControllers';

class InventoryRouter {
    public router: Router;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/findInventory', InvController.findInventory);
        this.router.post('/createInventory', InvController.createInventory);
        // this.router.delete('/deletefindInventory', InvController.deletefindInventory);
    }
}

// Export an instance of the InventoryRouter
export default new InventoryRouter();
