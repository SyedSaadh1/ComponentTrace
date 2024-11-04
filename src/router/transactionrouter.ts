import express, { Router } from "express";
import Transactioncontroller from "../controller/transactioncontroller";

class TransactionRouter {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/findtransaction", Transactioncontroller.findtransaction);
    this.router.post(
      "/createtransaction",
      Transactioncontroller.createtransaction
    );
  }
}

// Export an instance of the transaction
export default new TransactionRouter();
