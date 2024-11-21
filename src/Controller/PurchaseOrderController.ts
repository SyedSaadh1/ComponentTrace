import { Request, Response } from "express";
import AutogenerateId from "../AutogenerateId/AutogenerateId";
import PORepo from "../Repository/PurchaseOrderRepository";
import CMRepo from "../Repository/ComponentMasterRepository";
import PoValidations from "../Validations/PurchaseOrder.validation";
import { Mutex } from "async-mutex";
class POController {
  private mutex: Mutex;
  constructor() {
    this.mutex = new Mutex();
  }
  createPurchaseOrder = async (req: Request, res: Response) => {
    try {
      const { orderDetails, orderedTo } = req.body;
      const { error, value } = await PoValidations.validate(req.body);
      if (error) {
        return res
          .status(400)
          .send({ msg: "Validation error in Joi " + error });
      }

      const datevalidation = /^\d{4}-\d{2}-\d{2}$/;

      // Validate all orderDetails
      const updatedOrderDetails = await Promise.all(
        orderDetails.map(async (item: any) => {
          if (item.expectedDate && typeof item.expectedDate === "string") {
            if (!datevalidation.test(item.expectedDate)) {
              return {
                error: `Invalid date format for expectedDate: ${item.expectedDate}`,
              };
            }
          }
          return item;
        })
      );

      // Check if any validation failed
      const errorItem = updatedOrderDetails.find((item: any) => item.error);
      if (errorItem) {
        return res.status(400).send(errorItem.error);
      }

      const orderedComponents = await Promise.all(
        updatedOrderDetails.map(async (item: any) => {
          const foundComponent = await CMRepo.find({
            componentMasterName: item.componentMasterName,
          });

          if (foundComponent?.length > 0) {
            return {
              ...item,
              componentMasterId: foundComponent[0].componentMasterId,
            };
          } else {
            return { ...item, componentMasterId: " " };
          }
        })
      );
      const deliveredComponents = orderedComponents;
      const order = {
        ...value,
        orderDetails: orderedComponents,
        deliveredComponents: deliveredComponents,
      };
      const release = await this.mutex.acquire();
      let createdPurchaseOrder;
      try {
        const generatedPOId = await AutogenerateId.poIdGenerate(orderedTo);
        order.poId = generatedPOId;
        createdPurchaseOrder = await PORepo.createPo(order);
      } finally {
        release();
      }
      res.status(201).send({
        msg: "Purchase Order created successfully",
        createdPurchaseOrder,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ msg: "Error processing in creating Purchase Order" + error });
    }
  };
  findOrders = async (req: Request, res: Response) => {
    try {
      const result = await PORepo.findOrders();
      res.status(200).send(result);
    } catch (error) {
      console.log("Error in finding order : " + error);
    }
  };
}

export default new POController();
