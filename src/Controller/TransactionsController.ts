import { Request, Response } from "express";
import transactionsRepo from "../Repository/TransactionsRepository";
import validateTransaction from "../Validations/Transactions.validation";
import generateId from "../AutogenerateId/AutogenerateId";
import PORepo from "../Repository/PurchaseOrderRepository";
import { Mutex } from "async-mutex";
import ComponentListRepo from "../Repository/ComponentListRepository";
import InventoryControllers from "./InventoryControllers";
import InventoryRepository from "../Repository/InventoryRepository";
class TransactionController {
  private mutex: Mutex;
  constructor() {
    this.mutex = new Mutex();
  }
  async createTransaction(req: Request, res: Response) {
    try {
      const Data = req.body;
      const { userName } = req.userSession;
      const { poId } = Data;
      const componentsDetails = Data.componentsDetails;
      for (const item of componentsDetails) {
        const requiredQuantity = await PORepo.getQuantity(
          poId,
          item.componentMasterId
        );
        if (requiredQuantity < item.quantity) {
          return res.status(400).send({
            msg: `Can't send more than required quantity for componentMasterId: ${item.componentMasterId}`,
          });
        }
      }
      const completeComponentsData = await Promise.all(
        componentsDetails.map(async (item: any) => {
          try {
            // const requiredQuantity = await PORepo.getQuantity(
            //   poId,
            //   item.componentMasterId
            // );
            // if (requiredQuantity < item.quantity) {
            //   console.log(
            //     "Can't send more than required quantity from customer "
            //   );
            //   return;
            // }
            const ids = await ComponentListRepo.getComponentIds(item, userName);
            item.componentIds = ids;
            return item;
          } catch (error) {
            console.log("Error while processing component ids " + error);
            return res
              .status(400)
              .send("error in processing component ids -:" + error);
          }
        })
      );
      Data.componentsDetails = completeComponentsData;
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

      await Promise.all(
        componentsDetails.map(async (item: any) => {
          const { componentMasterId, quantity } = item;
          await InventoryRepository.updateQuantity(
            componentMasterId,
            -quantity,
            userName
          );
        })
      );
      return res.status(201).send({ msg: "Order sent", Data: result });
    } catch (error) {
      return res.status(500).send("Error in creating Transaction: " + error);
    }
  }
  async createGRNNumber(req: Request, res: Response) {
    try {
      const transactionId = req.params.transactionId;
      const grnData = req.body;
      const { userName } = req.userSession;

      const { componentsDetails, poId } = grnData;

      const grnNumber: string = await generateId.generateGRNNumber();
      const result = await transactionsRepo.updateGRNNumber(
        transactionId,
        grnNumber,
        grnData
      );
      const remainingQuantities = await Promise.all(
        componentsDetails.map(async (component: any) => {
          const quantity = await PORepo.updateDeliveredComponents(
            component,
            poId,
            userName
          );
          if (quantity < 0) {
            console.log("This product is delivered");
            throw new Error("This product delivery is completed");
          }
          return quantity;
        })
      );
      const totalQuantity = remainingQuantities.reduce(
        (sum, quantity) => sum + quantity,
        0
      );
      console.log("totalQuantity-->" + totalQuantity);
      if (totalQuantity === 0) {
        await PORepo.updatePOStatus(poId);
      }
      if (result.matchedCount === 0) {
        return res.status(404).send({ msg: "Transaction not found" });
      }

      if (result.modifiedCount > 0 && result.acknowledged) {
        await InventoryControllers.insertDoc(req, res);
        return res.status(200).send({
          msg: "GRN Number generated and updated Inventory successfully",
        });
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
