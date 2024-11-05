import Db from "./Config/DBConnection";
import express, { Application } from "express";
import cors from "cors";
import ComponentMasterRouter from "./Router/ComponentMasterRouter";
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
    this.app.use("/componentMaster", ComponentMasterRouter);
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
