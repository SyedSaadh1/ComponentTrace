import express, { Router, Request, Response } from "express";
import ComponentController from "../Controller/ComponentController";

class ComponentRouter {
  public router: Router;
  ComponentController: ComponentController;
  constructor() {
    this.router = Router();
    this.ComponentController = new ComponentController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/findAllComponents",
      this.ComponentController.findAllComponents
    );
    this.router.post(
      "/storeComponents",
      this.ComponentController.storeComponents
    );
    this.router.get(
      "/findComponentByName/:compName",
      this.ComponentController.findComponentByName
    );
    this.router.put(
      "/updateComponents",
      this.ComponentController.updateComponents
    );
    // Uncomment below for delete functionality if implemented
    // this.router.delete('/deleteComponent/:componentId', ComponentController.deleteComponent);
  }
}

// Export an instance of the ComponentRouter
export default new ComponentRouter().router;
