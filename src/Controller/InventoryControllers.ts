import { Request, Response } from "express";
import InvRepo from "../Repository/InventoryRepository";
import InventoryRepository from "../Repository/InventoryRepository";

//Controller
class InvController {
  //get
  async inventory(req: Request, res: Response) {
    try {
      const result = await InvRepo.findAllInv();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json("Error : " + error);
    }
  }
  async insertDoc(req: Request, res: Response) {
    try {
      const { userName } = req.userSession;
      const data = req.body.componentsDetails;
      await Promise.all(
        data.map(async (item: any) => {
          const { componentMasterId, quantity } = item;
          const isExist = await InvRepo.findComponents({
            componentMasterId,
            userName,
          });
          if (isExist) {
            console.log(
              "doc found updating quantity that is now - " + isExist.quantity
            );

            await InventoryRepository.updateQuantity(
              componentMasterId,
              quantity,
              userName
            );
          } else {
            console.log("creating new doc in inventory");
            await InventoryRepository.createDoc(item, userName);
          }
        })
      );
    } catch (error) {
      throw error;
    }
  }
}

export default new InvController();
