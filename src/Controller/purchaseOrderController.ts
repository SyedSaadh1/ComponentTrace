import { Request, Response } from "express";
import PORepo from "../Repository/purchaseOrderRepository";
import CMRepo from "../Repository/ComponentMasterRepository";
import AutogenerateId from "../AutogenerateId/AutogenerateId";

class POController {
  async createPurchaseOrder(req: Request, res: Response) {
    const { orderDetails } = req.body;
    const generatedPOId = await AutogenerateId.poIdGenerate();

    try {
      //Use map to create an array of promises to fetch component IDs

      const orderedComponents = orderDetails.map(async (item: any) => {
        const foundComponent = await CMRepo.find({
          componentMasterName: item.componentMasterName,
        });

        if (foundComponent?.length > 0) {
          return {
            ...item,
            componentMasterId: foundComponent[0].componentMasterId,
          };
        } else {
          console.warn(
            `Component Master not found: ${item.componentMasterName}`
          );
          return { ...item, componentMasterId: " " };
        }
      });

      //Resolve all promises
      const resolvedOrders = await Promise.all(orderedComponents);

      const order = {
        ...req.body,
        orderDetails: resolvedOrders,
        poId: generatedPOId,
      };

      const result = await PORepo.createPo(order);
      res
        .status(201)
        .send({ msg: "Purchase Order created successfully", result });
    } catch (error) {
      console.error("Error processing components:", error);
      res.status(500).send({ msg: "Error processing components" });
    }
  }
}

// Export the controller instance
export default new POController();
