import { Request, Response } from 'express';
import InvRepo from '../repositories/InventoryRepository';
import { deflateSync } from 'zlib';

class InvController {
  async findInventory(req: Request, res: Response) {
    try {
      const result = await InvRepo.findAllInv();
      res.json(result);
    } catch (error) {
      res.json("Error : " + error)
    }
  }
  async createInventory(req: Request, res: Response) {
    try {
      const result = await InvRepo.createInv(req.body);
      res.json(result);
    } catch (error) {
      res.json("Error in creating : " + error)
    }
  }
}

export default new InvController();
