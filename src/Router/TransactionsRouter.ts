import express, { Router } from "express";
import transactionController from "../Controller/TransactionsController";

class TransactionRouter {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", transactionController.findTransactions);
    this.router.post("/", transactionController.createTransaction);
    this.router.put(
      "/grn/:transactionId",
      transactionController.createGRNNumber
    );
  }
  getRouter() {
    return this.router;
  }
}

// Export an instance of the transaction
export default new TransactionRouter().getRouter();
