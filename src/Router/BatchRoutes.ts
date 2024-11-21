import express, { Router } from "express";
import BatchController from "../Controller/BatchController";

class BatchRouter {
  router: Router;
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/createBatch", BatchController.createBatch);
    this.router.get("/getAllBatches", BatchController.getAllBatches);
    this.router.get("/getBatchById/:id", BatchController.getBatchById);
    this.router.put("/updateBatch/:id", BatchController.updateBatch);
  }
  getRouter() {
    return this.router;
  }
}

export default new BatchRouter().getRouter();
