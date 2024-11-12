import express, { Router } from "express";
import Controller from "../Controller/componentMasterController";

class ComponentMasterRouter {
  router: Router;
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    //api to create Component Master
    this.router.post(
      "/createComponentMaster",
      Controller.createComponentMaster
    );
    //apis to fetch component masters
    this.router.get("/findComponentMaster", Controller.findComponentMaster);
    this.router.get("/findNFPComponents", Controller.findNFPComponents);
    this.router.get("/findSubComponents/:CMID", Controller.findSubComponents);
    //api to update component master
    this.router.put("/updateComponentMaster", Controller.updateComponentMaster);
  }

  getRouter() {
    return this.router;
  }
}

export default new ComponentMasterRouter().getRouter();
