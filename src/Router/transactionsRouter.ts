import express, { Router } from "express";
import transactionController from "../Controller/transactionsController";

class TransactionRouter {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/findTransaction", transactionController.findTransactions);
    this.router.post(
      "/createTransaction",
      transactionController.createTransaction
    );
    this.router.put("/createGRNNumber", transactionController.createGRNNumber);
  }
  getRouter() {
    return this.router;
  }
}

// Export an instance of the transaction
export default new TransactionRouter().getRouter();
