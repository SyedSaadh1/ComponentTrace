import { Request, Response } from "express";
import transactionsRepo from "../Repository/transactionsRepository";
import validateTransaction from "../Validations/transactions.validation";
import generateId from "../AutogenerateId/AutogenerateId";
import PORepo from "../Repository/purchaseOrderRepository";
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
      const transactionId = await generateId.generateTransactionId();
      value.transactionId = transactionId;
      const result = await transactionsRepo.createTransaction(value);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json("Error in creating : " + error);
    }
  }
  async createGRNNumber(req: Request, res: Response) {
    try {
      const grnData = req.body;

      const { transactionId, componentsDetails, poId } = grnData;
      if (!Array.isArray(componentsDetails) || componentsDetails.length === 0) {
        return res.status(400).send({ msg: "Invalid components details" });
      }
      const remainingQuantities = await Promise.all(
        componentsDetails.map(async (component: any) => {
          const quantity = await PORepo.updateDeliveredComponents(
            component,
            poId
          );
          return quantity;
        })
      );
      const totalQuantity = remainingQuantities.reduce(
        (sum, quantity) => sum + quantity,
        0
      );
      console.log("totalQuantity-->" + totalQuantity);

      const grnNumber: string = await generateId.generateGRNNumber();
      const result = await transactionsRepo.updateGRNNumber(
        transactionId,
        grnNumber,
        grnData
      );
      if (totalQuantity === 0) {
        await PORepo.updatePOStatus(poId);
      }
      if (result.matchedCount === 0) {
        return res.status(404).send({ msg: "Purchase Order not found" });
      }

      if (result.modifiedCount > 0 && result.acknowledged) {
        return res
          .status(200)
          .send({ msg: "GRN Number generated and updated successfully" });
      }

      return res.status(400).send({ msg: "Failed to update GRN Number" });
    } catch (error) {
      console.error("Error generating GRN Number:", error);

      return res.status(500).send({ msg: "Error occured at server ", error });
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
