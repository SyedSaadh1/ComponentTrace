import { Request, Response } from "express";
import componentMasterBody from "../Validations/ComponentMaster.validation";
import generateId from "../AutogenerateId/AutogenerateId";
import Repo from "../Repository/ComponentMasterRepository";

class ComponentMasterController {
  createComponentMaster = async (req: Request, res: Response) => {
    const { error, value } = componentMasterBody.validate(req.body);
    const lastInsertedComponentMasterId = await generateId.idGenerate();

    try {
      value.componentMasterId = lastInsertedComponentMasterId;
      if (error) {
        console.log("Error in Validation");
        return res
          .status(400)
          .send({ msg: "validation failed ", details: error.details });
      }
      const { componentMasterName } = value;
      const isExist = await Repo.find({ componentMasterName });
      if (isExist.length > 0) {
        console.log("Error in Creation");
        return res
          .status(409)
          .send({ msg: "Component Master already exists with that name" });
      }
      const result = await Repo.createComponentMaster(value);
      //should have to minimize the response by sending only neccessary properties in response
      return res
        .status(201)
        .send({ msg: "Component Master Created Successfully", Data: result });
    } catch (error) {
      console.error("Error Encountered while Creating Component Master", error);
      return res.status(500).send({ msg: "Error Creating Component Master" });
    }
  };
  findComponentMaster = async (req: Request, res: Response) => {
    const filter = req.query;
    try {
      const result = await Repo.find(filter);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({ msg: "Encountered an Error : " + error });
    }
  };
  findNFPComponents = async (req: Request, res: Response) => {
    try {
      const result = await Repo.find({ isFinalProduct: false });
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({
        msg:
          "Encountered an Error while retrieving non final products : " + error,
      });
    }
  };
  findSubComponents = async (req: Request, res: Response) => {
    try {
      const componentMasterId = req.params.CMID;
      const result = await Repo.getSubComponents(componentMasterId);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({
        msg: "Encountered an error while fetching sub-components ",
        error,
      });
    }
  };
  updateComponentMaster = async (req: Request, res: Response) => {
    const Data = req.body;
    try {
      const result = await Repo.updateComponentMaster(Data);
      if (!result.acknowledged) {
        res.status(400).send({ msg: "Updating operation not acknowledged" });
      } else if (result.matchedCount == 0) {
        res.status(404).send({ msg: "No Component Master found" });
      } else if (result.modifiedCount > 0) {
        res.status(200).send({ msg: "Component Master Updated Successfully" });
      } else {
        res.status(200).send({ msg: "Already upto date" });
      }
    } catch (error) {
      res.status(500).send({
        msgh: "An Error encountered. Please try again later " + error,
      });
    }
  };
}

export default new ComponentMasterController();
