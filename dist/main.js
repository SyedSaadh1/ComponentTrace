"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inventoryRoutes_1 = __importDefault(require("./routes/inventoryRoutes"));
const MongoDBConnections_1 = __importDefault(require("./config/MongoDBConnections"));
// const app=express();
// app.use(express.json());
class Main {
    constructor(port) {
        this.App = (0, express_1.default)();
        this.port = port;
        this.dbConnect();
        this.initializeMiddleware();
        this.initializeRoutes();
    }
    initializeMiddleware() {
        this.App.use(express_1.default.json());
    }
    initializeRoutes() {
        this.App.use('/api/IO', inventoryRoutes_1.default.router);
    }
    dbConnect() {
        MongoDBConnections_1.default.DBConnect();
    }
    listen() {
        this.App.listen(this.port, () => {
            console.log("Server started on port : " + this.port);
        });
    }
}
const port = 3000;
const refApp = new Main(port);
refApp.listen();
