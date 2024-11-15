import express, { Router } from "express";
import Controller from "../Controller/ComponentMasterController";

class ComponentMasterRouter {
  router: Router;
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }
  //
  initializeRoutes() {
    //api to create Component Master
    this.router.post("/", Controller.createComponentMaster);
    //api to fetch component masters
    this.router.get("/", Controller.findComponentMaster);
    //api to get Non final Products
    this.router.get("/nonFinalProducts", Controller.findNFPComponents);
    //api to get sub components
    this.router.get(
      "/subComponents/:componentMasterId",
      Controller.findSubComponents
    );
    //api to update component master
    this.router.put("/:componentMasterId", Controller.updateComponentMaster);
  }

  getRouter() {
    return this.router;
  }
}

export default new ComponentMasterRouter().getRouter();
