import { Request, Response } from "express";
import AutogenerateId from "../AutogenerateId/AutogenerateId";
import PORepo from '../Repository/purchaseOrderRepository';
import CMRepo from '../Repository/ComponentMasterRepository';

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

      const createdPurchaseOrder = await PORepo.createPo(order);
      res
        .status(201)
        .send({ msg: "Purchase Order created successfully",createdPurchaseOrder });
    } catch (error) {
      
      res.status(500).send({ msg: "Error processing components" });
    }
  }
}

export default new POController();