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
    this.router.post(
      "/createComponentMaster",
      Controller.createComponentMaster
    );
    //api to fetch component masters
    this.router.get("/ComponentMaster", Controller.findComponentMaster);
    //api to get Non final Products
    this.router.get("/NFPComponents", Controller.findNFPComponents);
    //api to get sub components
    this.router.get("/SubComponents/:CMID", Controller.findSubComponents);
    //api to update component master
    this.router.put("/updateComponentMaster", Controller.updateComponentMaster);
  }

  getRouter() {
    return this.router;
  }
}

export default new ComponentMasterRouter().getRouter();
