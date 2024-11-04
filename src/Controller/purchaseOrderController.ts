import { Request, Response } from "express";
import PORepo from "../repository/purchaseOrderRepository";
import CMRepo from "../repository/ComponentMasterRepository";
import AutogenerateId from "../AutogenerateId/AutogenerateId";

class POController {
  async createPurchaseOrder(req: Request, res: Response) {
    const { orderDetails } = req.body;
    const generatedPOId = await AutogenerateId.poIdGenerate();

    try {
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
    
      res.status(500).send({ msg: "Error processing components" });
    }
  }
}

export default new POController();