import UserController from "../Controller/UserController";
import express, { Router } from "express";
class UserRouter {
  router: Router;
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.post("/", UserController.registerUser);
  }
  getRouter() {
    return this.router;
  }
}
export default new UserRouter().getRouter();
