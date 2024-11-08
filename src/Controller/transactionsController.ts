import { Request, Response } from "express";
import transactionsRepo from "../Repository/transactionsRepository";
import validateTransaction from "../Validations/transactions.validation";
class TransactionController {
  async createTransaction(req: Request, res: Response) {
    try {
      const Data = req.body;
      const { error, value } = validateTransaction.validate(Data);
      if (error) {
        return res
          .status(400)
          .send({ msg: "Error in Validation. check your data" });
      }
      const result = await transactionsRepo.createTransaction(value);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json("Error in creating : " + error);
    }
  }
  async findTransactions(req: Request, res: Response) {
    try {
      const result = await transactionsRepo.findAllTransactions();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json("Error : " + error);
    }
  }
}
export default new TransactionController();
