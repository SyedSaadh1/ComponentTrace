import Db from "./Config/MongoDBConnection";
import express, { Application } from "express";
import cors from "cors";
import ComponentMasterRouter from "./Router/ComponentMasterRouter";
import invRouter from "./Router/InventoryRoutes";
import batchRouter from "./Router/BatchRoutes";
import poRouter from "./Router/PurchaseOrderRoutes";
import componentListRouter from "./Router/ComponentRouter";
import transactionsRouter from "./Router/TransactionsRouter";
import keycloak from "./Config/KeycloakMultiRealm";
import { DI } from "./DI/DIContainer";
import session, { MemoryStore } from "express-session";
import crypto from "crypto";
import { UserSession } from "./Security/SecurityContext";
const memoryStore = DI.get<typeof MemoryStore>(MemoryStore);
import { SecurityContext } from "./Security/SecurityContext";
class App {
  private port: Number;
  private securityContext: SecurityContext;
  private app: Application;
  private Keycloak: typeof keycloak;
  constructor(port: Number) {
    this.port = port;
    this.app = express();
    this.Keycloak = DI.get(keycloak);
    this.securityContext = DI.get(SecurityContext);

    this.initializeMiddleware();

    this.connectDatabase();

    this.initializeRoutes();
  }

  initializeMiddleware() {
    const secretKey = crypto.randomBytes(32).toString("hex"); // Generates a random key

    this.app.use(
      session({
        secret: secretKey,
        resave: false, // Ensure to set this explicitly
        saveUninitialized: false, // Ensure to set this explicitly
        store: new MemoryStore(), // Uncomment if using a session store
      })
    );

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

    this.app.use(keycloak.configure());
    this.app.use(keycloak.middleware());
    this.app.use((req, res, next) => {
      const UserSession: UserSession | undefined =
        this.securityContext.session(req);
      if (UserSession) {
        req.userSession = UserSession;
        console.log("UserSession : " + UserSession);
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
