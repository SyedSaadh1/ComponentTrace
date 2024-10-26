import Repo from "../Repository/ComponentMasterRepository";
import { Request, Response } from "express";
import componentMasterBody from "../Validations/ComponentMaster.validation";
import generateId from "../AutogenerateId/AutogenerateId";
class ComponentMasterController {
  async findAllComponentMaster(req: Request, res: Response) {
    const filter = req.query;
    try {
      const result = await Repo.find(filter);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({ msg: "Encountered an Error : " + error });
    }
  }
  createComponentMaster = async (req: Request, res: Response) => {
    const { error, value } = componentMasterBody.validate(req.body);
    const lastInsertedComponentMasterId = await generateId.idGenerate();
    value.componentMasterId = lastInsertedComponentMasterId;
    if (error) {
      return res
        .status(400)
        .send({ msg: "validation failed ", details: error.details });
    }
    const { componentMasterName } = value;
    const isExist = await Repo.find({ componentMasterName });
    if (isExist.length > 0) {
      return res
        .status(409)
        .send({ msg: "Component Master already exists with that name" });
    }
    try {
      const result = await Repo.createComponentMaster(value);
      return res
        .status(201)
        .send({ msg: "Component Master Created Successfully", Data: result });
    } catch (error) {
      console.error("Error Encounter Creating Component Master", error);
      return res.status(500).send({ msg: "Error Creating Component Master" });
    }
  };
}

export default new ComponentMasterController();
