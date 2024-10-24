import router from "./Router/ComponentMasterRouter";
import Db from "./Config/DBConnection";
import express, { Application } from "express";

class App {
  port: Number;
  app: Application;
  constructor(port: Number) {
    this.port = port;
    this.app = express();
    this.initializeMiddleware();
    this.initializeRoutes();
    this.connectDatabase();
  }

  initializeMiddleware() {
    this.app.use(express.json());
  }

  initializeRoutes() {
    this.app.use("/componentMaster", router);
  }

  connectDatabase() {
    Db.connect();
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server Started on Port ${this.port}`);
    });
  }
}

// Create an instance of the Server class and start it
const port = 7000;
const server = new App(port);
server.start();
