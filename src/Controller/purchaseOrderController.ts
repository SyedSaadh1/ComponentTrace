import { Request, Response } from "express";
import AutogenerateId from "../AutogenerateId/AutogenerateId";
import PORepo from "../Repository/purchaseOrderRepository";
import CMRepo from "../Repository/componentMasterRepository";
import PoValidations from "../Validations/purchaseOrder.validation";

class POController {
  async createPurchaseOrder(req: Request, res: Response) {
    try {
      const { orderDetails } = req.body;
      const { error, value } = await PoValidations.validate(req.body);
      if (error) {
        return res
          .status(400)
          .send({ msg: "Validation error in Joi " + error });
      }

      const generatedPOId = await AutogenerateId.poIdGenerate();

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
        poId: generatedPOId,
        deliveredComponents: deliveredComponents,
      };

      const createdPurchaseOrder = await PORepo.createPo(order);
      res.status(201).send({
        msg: "Purchase Order created successfully",
        createdPurchaseOrder,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ msg: "Error processing in creating Purchase Order" });
    }
  }
}

export default new POController();
