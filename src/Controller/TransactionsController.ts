import { Request, Response } from "express";
import transactionsRepo from "../Repository/TransactionsRepository";
import validateTransaction from "../Validations/Transactions.validation";
import generateId from "../AutogenerateId/AutogenerateId";
import PORepo from "../Repository/PurchaseOrderRepository";
import { Mutex } from "async-mutex";
import ComponentListRepo from "../Repository/ComponentListRepository";
class TransactionController {
  private mutex: Mutex;
  constructor() {
    this.mutex = new Mutex();
  }
  async createTransaction(req: Request, res: Response) {
    try {
      const Data = req.body;
      const userSession = req.userSession;
      const { userName } = userSession;
      const transactionDetails = Data.componentsDetails;
      const completeTransactionData = await Promise.all(
        transactionDetails.map(async (item: any) => {
          try {
            const ids = await ComponentListRepo.getComponentIds(item);
            item.componentIds = ids;
            return item;
          } catch (error) {
            console.log("error in promise.all " + error);
            return res
              .status(400)
              .send("error in processing component ids -:" + error);
          }
        })
      );
      Data.componentsDetails = completeTransactionData;
      const { error, value } = validateTransaction.validate(Data);

      if (error) {
        console.log(
          "Validation Error while performing transaction is :" + error
        );
        return res
          .status(400)
          .send({ msg: "Error in Validation. check your data" });
      }
      // let release = await this.mutex.acquire();
      let result;
      // try {
      const transactionId = await generateId.generateTransactionId();
      value.transactionId = transactionId;
      value.from = userName;
      result = await transactionsRepo.createTransaction(value);
      // } //finally {
      // release();
      // }
      return res.status(201).send({ msg: "Order sent", Data: result });
    } catch (error) {
      return res.status(500).send("Error in creating Transaction: " + error);
    }
  }
  async createGRNNumber(req: Request, res: Response) {
    try {
      const transactionId = req.params.transactionId;
      const grnData = req.body;

      const { componentsDetails, poId } = grnData;
      const componentIds = componentsDetails.componentIds;
      // if (componentsDetails.length === 0) {
      //   return res
      //     .status(400)
      //     .send({ msg: "components details should not be empty" });
      // }
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
        grnData,
        componentIds
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
