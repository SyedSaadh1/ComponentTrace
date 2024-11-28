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

   // Fetch available quantity by componentMasterName
   async getAvailableQuantity(req: Request, res: Response) {
    try {
      const  componentMasterName = req.params.componentMasterName;
      console.log("params:"+componentMasterName)
      if (!componentMasterName) {
        return res.status(400).json({
          status: "error",
          message: "componentMasterName query parameter is required.",
        });
      }

      const availableQuantity = await InvRepo.getAvailableQuantityByMasterName(
        componentMasterName
      );
      console.log("returned "+availableQuantity)

      if (availableQuantity === null) {
        return res.status(404).json({
          status: "error",
          message: `No inventory found for componentMasterName: ${componentMasterName}`,
        });
      }

      res.status(200).json({
        status: "success",
        data: {
          componentMasterName,
          availableQuantity,
        },
      });
    } catch (error) {
      console.error("Error in getAvailableQuantity:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error. Please try again later.",
      });
    }
  }
}

export default new InvController();
