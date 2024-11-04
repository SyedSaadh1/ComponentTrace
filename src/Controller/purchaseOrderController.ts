import { Request, Response } from 'express';
import PORepo from '../repository/purchaseOrderRepository';
import CMRepo from '../repository/ComponentMasterRepository';

class POController {
  async createPurchaseOrder(req: Request, res: Response) {
    try {
      const updatedObjects = [];

      // Iterate through each object in the request body
      for (const originalObject of req.body) {
        const { componentMasterName } = originalObject.orderDetails; // Correct destructuring
        const result1 = await CMRepo.find({ componentMasterName }, { componentMasterId: 1 }).catch(() => 
        {
          return [];
       });
        updatedObjects.push({
         ...originalObject,
          result1
        }
      );
      }

      res.status(200).json(updatedObjects);
    } catch (error) {
      res.status(500).json({ message: "Error in creating purchase order: " + error });
    }
  }




}

export default new POController();
