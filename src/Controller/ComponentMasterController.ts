import Repo from "../Repository/ComponentMasterRepository";
import { Request, Response } from "express";

class ComponentMasterController {
  async findAllComponentMaster(req: Request, res: Response) {
    try {
      const result = await Repo.findAll();
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ msg: "Encountered an Error : " + error });
    }
  }
  async createComponentMaster(req: Request, res: Response) {
    const Data = req.body;
    try {
      const result = await Repo.createComponentMaster(Data);
      res
        .status(201)
        .send({ msg: "Component Master Created Successfully", Data: result });
    } catch (error) {
      console.error("Error Encounter Creating Component Master", error);
      res.status(500).send({ msg: "Error Creating Component Master" });
    }
  }
}

export default new ComponentMasterController();
