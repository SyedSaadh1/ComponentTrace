import { Request, Response } from "express";
import componentMaster from "../Validations/ComponentMaster.validation";
import generateId from "../AutogenerateId/AutogenerateId";
import Repo from "../Repository/ComponentMasterRepository";
import { Mutex } from "async-mutex";
import InventoryRepository from "../Repository/InventoryRepository";
class ComponentMasterController {
  private mutex: Mutex;
  constructor() {
    this.mutex = new Mutex();
  }
  createComponentMaster = async (req: Request, res: Response) => {
    try {
      const { error, value } = componentMaster.validate(req.body);

      if (error) {
        console.log("Error in Validation");
        return res
          .status(400)
          .send({ msg: "validation failed ", details: error.details });
      }
      const { componentMasterName } = value;
      const isExist = await Repo.find({ componentMasterName });
      if (isExist.length > 0) {
        console.log("Error in Creation ,Duplicate Component Master Name");
        return res
          .status(409)
          .send({ msg: "Component Master already exists with that name" });
      }
      const release = await this.mutex.acquire();
      const userSession = req.userSession;
      const { userName } = userSession;

      let result: any;
      try {
        value.createdBy = userName;
        value.componentMasterId = await generateId.CMIdGenerate();
        console.log(value.componentMasterId);

        result = await Repo.createComponentMaster(value);
      } finally {
        release();
        console.log("lock released");
      }
      const {
        componentMasterId,
        category,
        componentDescription,
        components,
        createdBy,
        isFinalProduct,
      } = result;
      const invDoc = { componentMasterId, componentMasterName };
      await InventoryRepository.createDoc(invDoc, userName);
      res.status(201).send({
        msg: "Component Master Created Successfully",
        componentMasterId,
        componentMasterName,
        category,
        componentDescription,
        components,
        createdBy,
        isFinalProduct,
      });
    } catch (error) {
      console.error(
        "Error Encountered while Creating Component Master:",
        error
      );
      return res
        .status(500)
        .send({ msg: "Error Creating Component Master:" + error });
    }
  };
  findComponentMaster = async (req: Request, res: Response) => {
    const filter = req.query;
    try {
      const result = await Repo.find(filter);
      const filteredResult = result.map((item: any) => ({
        componentMasterId: item.componentMasterId,
        componentMasterName: item.componentMasterName,
        createdBy: item.createdBy,
        components: item.components,
        isFinalProduct: item.isFinalProduct,
      }));
      return res.status(200).send(filteredResult);
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
      const componentMasterId = req.params.componentMasterId;
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
