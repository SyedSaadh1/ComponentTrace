import { Request, Response } from "express";
import TransactionRepo from "../Repositories/transactionrepository";
import { deflateSync } from "zlib";

class TransactionController {
  async findtransaction(req: Request, res: Response) {
    try {
      const result = await TransactionRepo.findAlltransactions({
        transactionId: "1",
      });
      res.json(result);
    } catch (error) {
      res.json("Error : " + error);
    }
  }
  async createtransaction(req: Request, res: Response) {
    try {
      const result = await TransactionRepo.createtransaction(req.body);
      res.json(result);
    } catch (error) {
      res.json("Error in creating : " + error);
    }
  }
}

export default new TransactionController();
