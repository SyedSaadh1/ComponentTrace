import { Request, Response } from 'express';
import InvRepo from '../Repository/InventoryRepository';

//Controller
class InvController {
  //get
  async inventory(req: Request, res: Response) {
    try {
      const result = await InvRepo.findAllInv();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json("Error : " + error)
    }
  }
  // post 
//   async createInventory(req: Request, res: Response) {
//     try {
//       const result = await InvRepo.createInv(req.body);
//       res.status(200).json(result);
//     } catch (error) {
//       res.status(500).json("Error in creating : " + error)
//     }
//   }
}

export default new InvController();
