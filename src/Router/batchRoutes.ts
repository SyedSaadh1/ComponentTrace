import express, { Router } from 'express';
import BatchController from '../Controller/batchController'; 

class BatchRouter {
    public router: Router;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/createBatch', BatchController.createBatch);
        this.router.get('/getAllBatches', BatchController.getAllBatches);
        this.router.get('/getBatchById/:id', BatchController.getBatchById);
        this.router.put('/updateBatch/:id', BatchController.updateBatch);
        this.router.delete('/deleteBatch/:id', BatchController.deleteBatch);
    }
}

// Export an instance of the BatchRouter
export default new BatchRouter().router;
