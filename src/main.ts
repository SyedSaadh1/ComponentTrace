import router from "./Router/ComponentMasterRouter";
import invRouter from "./Router/inventoryRoutes";
import batchRouter from "./Router/batchRoutes";
import Db from "./Config/MongoDBConnection";
import express, { Application } from "express";
import componentListRouter from "./Router/componentRouter";
import poRouter from "./Router/purchaseOrderRoutes";

import cors from "cors";
class Main {
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
    this.app.use(cors());
    this.app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "PUT, GET, POST, DELETE, OPTIONS"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With, Content-Type"
      );

      next();
    });
  }

  initializeRoutes() {
    this.app.use("/componentMaster", router);
    this.app.use("/components", componentListRouter);
    this.app.use("/inventoryDetails", invRouter);
    this.app.use("/batch", batchRouter);
    this.app.use("/componentMaster", componentListRouter);
    this.app.use("/purchaseOrder", poRouter);
  }

  connectDatabase() {
    Db.DBConnect();
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server Started on Port ${this.port}`);
    });
  }
}

// Create an instance of the Server class and start it
const port = 7000;
const server = new Main(port);
server.start();
