import Db from "./Config/MongoDBConnection";
import express, { Application } from "express";
import cors from "cors";
import ComponentMasterRouter from "./Router/ComponentMasterRouter";
import invRouter from "./Router/InventoryRoutes";
import batchRouter from "./Router/BatchRoutes";
import poRouter from "./Router/PurchaseOrderRoutes";
import componentListRouter from "./Router/ComponentRouter";
import UserRouter from "./Router/UserRouter";
import transactionsRouter from "./Router/TransactionsRouter";
import { KeycloakMultiRealm as keycloak } from "./Config/KeycloakMultiRealm";
import { DI } from "./di/DIContainer";
import session, { MemoryStore } from "express-session";
import { UserSession } from "./Security/SecurityContext";
// const memoryStore = DI.get<MemoryStore>(MemoryStore);
import { SecurityContext } from "./Security/SecurityContext";
class App {
  private port: Number;
  private securityContext: SecurityContext;
  private app: Application;
  private Keycloak: keycloak;
  constructor(port: Number) {
    this.port = port;
    this.app = express();
    this.Keycloak = DI.get<keycloak>(keycloak);
    this.securityContext = DI.get(SecurityContext);
    this.app.use(
      session({
        secret: "my_secret_key",
        resave: false,
        saveUninitialized: true,
      })
    );

    this.initializeMiddleware();

    this.connectDatabase();

    this.initializeRoutes();
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

    this.app.use(this.Keycloak.configure());
    this.app.use(this.Keycloak.middleware());
    this.app.use((req, res, next) => {
      const UserSession: UserSession | undefined =
        this.securityContext.session(req);
      if (UserSession) {
        req.userSession = UserSession;
        console.log("UserSession : " + JSON.stringify(UserSession));
      }
      next();
    });
  }

  initializeRoutes() {
    this.app.use(
      "/componentMasters",
      this.Keycloak.protect(),
      ComponentMasterRouter
    );
    this.app.use("/components", this.Keycloak.protect(), componentListRouter);
    this.app.use("/inventoryDetails", this.Keycloak.protect(), invRouter);
    this.app.use("/batch", this.Keycloak.protect(), batchRouter);
    this.app.use("/purchaseOrders", this.Keycloak.protect(), poRouter);
    this.app.use("/transactions", this.Keycloak.protect(), transactionsRouter);
    this.app.use("/", UserRouter);
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
const server = new App(port);
server.start();
