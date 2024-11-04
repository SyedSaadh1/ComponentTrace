import express, { Router } from "express";
import Controller from "../controller/ComponentMasterController";

class ComponentMasterRouter {
  router: Router;
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/findComponentMaster", Controller.findComponentMaster);
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
