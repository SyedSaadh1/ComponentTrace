import { Request, Response } from 'express';
import PORepo from '../repositories/purchaseOrderRepository';
//import CMRepo from '../repository/ComponentMasterRepository';

class POController {
  // async createPurchaseOrder(req: Request, res: Response) {
  //   try {
  //     const updatedObjects = [];

  //     // Iterate through each object in the request body
  //     for (const originalObject of req.body) {
  //       const { componentMasterName } = originalObject.orderDetails; // Correct destructuring
   
  //        console.log("hello")

  //       const result1 = await CMRepo.find({ componentMasterName }, { componentMasterId: 1 }).catch(() => 
  //       {

  //         return [];
  //      });

  //       updatedObjects.push({
  //        ...originalObject,
  //         result1
  //       }
  //     );
  //     }


  //     res.status(200).json(updatedObjects);
  //   } catch (error) {

  //     console.log("hello")
  //     res.status(500).json({ message: "Error in creating purchase order: " + error });
  //   }
  // }

  /////1234

  async createPurchaseOrder(req: Request, res: Response) {
    try {
      const updatedObjects = [];
  
      // Mocking CMRepo.find function
      const mockCMRepoFind = async (query: { componentMasterName: string }, projection: { componentMasterId: number }) => {
        // You can customize this response to fit your testing needs
        return [{ componentMasterId: 'default-id' }];
      };
  
      // Iterate through each object in the request body
      for (const originalObject of req.body) {
        const { componentMasterName } = originalObject.orderDetails; // Correct destructuring
  
        //console.log("hello");
  
        // Use the mock function instead of CMRepo.find
        const result1 = await mockCMRepoFind({ componentMasterName }, { componentMasterId: 1 }).catch(() => {
          return [];
        });
  
        updatedObjects.push({
          ...originalObject,
          result1
        });
      }
  
      res.status(200).json(updatedObjects);
    } catch (error) {
      console.log("hello");
      res.status(500).json({ message: "Error in creating purchase order: " + error });
    }
}}

export default new POController();
