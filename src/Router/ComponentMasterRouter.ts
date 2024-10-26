import express, { Router } from "express";
import Controller from "../Controller/ComponentMasterController";

class ComponentMasterRouter {
  router: Router;
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/findComponentMaster", Controller.findAllComponentMaster);
    this.router.post(
      "/createComponentMaster",
      Controller.createComponentMaster
    );
    this.router.put("/updateComponentMaster", Controller.updateComponentMaster);
  }

  getRouter() {
    return this.router;
  }
}

export default new ComponentMasterRouter().getRouter();
