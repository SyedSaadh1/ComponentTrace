"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const MongoDBConnections_1 = __importDefault(require("./Config/MongoDBConnections"));
const inventoryModel_1 = __importDefault(require("./Models/inventoryModel"));
MongoDBConnections_1.default.DBConnect();
// console.log(connected to mongodb);
const transactionmodel_1 = __importDefault(require("./Models/transactionmodel"));
MongoDBConnections_1.default.DBConnect();
let app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});
//added cors
// apis here.......
/**
 * findComponentMaster APi call will get all the Component Master details
//  */
app.get("/componentMaster/findComponentMaster", (req, res) => {
    res.status(200).send([
        {
            componentMasterId: "CM-001",
            componentMasterName: "Keyboard",
            componentMasterDescription: "Used for Vehicles",
            componentImage: "https://images.com/tyre.png",
            components: [
                { componentMasterName: "Keys", quantity: 100 },
                {
                    componentMasterName: "Mother Board",
                    quantity: 1,
                },
            ],
            isFinalProduct: false,
            category: "Electronics",
            productionStatus: "Active",
            createdBy: "miway",
            createdOn: "2024-10-18T00:00:00.000Z",
            updatedOn: "2024-10-18T00:00:00.000Z",
            _id: "67122520a5768407fca14e22",
        },
        {
            componentMasterId: "CM-002",
            componentMasterName: "Mouse",
            componentMasterDescription: "Used in Computers",
            componentImage: "https://images.com/mouse.png",
            components: [],
            isFinalProduct: false,
            category: "Electronics",
            productionStatus: "Active",
            createdBy: "miway",
            createdOn: "2024-10-18T00:00:00.000Z",
            updatedOn: "2024-10-18T00:00:00.000Z",
            _id: "67122520a5768407fca14e22",
        },
        {
            componentMasterId: "CM-003",
            componentMasterName: "Car",
            componentMasterDescription: "It is a 4 wheeler",
            componentImage: "https://images.com/car.png",
            components: [
                { componentMasterName: "Tyre", quantity: 4 },
                {
                    componentMasterName: "Engine",
                    quantity: 1,
                },
                {
                    componentMasterName: "Seats",
                    quantity: 5,
                },
            ],
            isFinalProduct: true,
            category: "Automobiles",
            productionStatus: "Active",
            createdBy: "miway",
            createdOn: "2024-10-18T00:00:00.000Z",
            updatedOn: "2024-10-18T00:00:00.000Z",
            _id: "67122520a5768407fca14e22",
        },
    ]);
});
// POST API to create a new ComponentMaster
app.post("/componentMaster/createComponentMaster", (req, res) => {
    const { componentMasterId, componentMasterName, componentMasterDescription, componentImage, components, isFinalProduct, category, quantity, productionStatus, createdBy, } = req.body; //this is req body format
    // Responding with the created component
    res.status(201).send({
        componentMasterId: componentMasterId || "CM-003",
        componentMasterName: componentMasterName || "Keyboard",
        componentMasterDescription: componentMasterDescription || "Used for PCs",
        componentImage: componentImage || "https://images.com/mouse.png",
        components: components || [
            {
                componentMasterName: "CM-002",
                quantity: 100,
            },
            {
                componentMasterName: "CM-001",
                quantity: 1,
            },
        ],
        quantity: 1,
        isFinalProduct: isFinalProduct || false,
        category: category || "Plastic",
        productionStatus: productionStatus || "Active",
        createdBy: createdBy || "user123",
        createdOn: new Date(),
        updatedOn: new Date(),
    });
});
//to fetch sub-components of a specific Component Master
app.get("/componentMaster/view/:componentMasterId", (req, res) => {
    const componentMasterId = req.params.componentMasterId;
    res.status(200).send({
        componentMasterId: componentMasterId || "CM-001",
        components: [
            { componentMasterName: "Tyre", quantity: 4 },
            {
                componentMasterName: "Seat",
                quantity: 5,
            },
            {
                componentMasterName: "Engine",
                quantity: 1,
            },
        ],
    });
});
//to update the Component Master if entered any wrong info
app.put("/componentMaster/updateComponentMaster", (req, res) => {
    const data = req.body;
    let result = {
        acknowledged: true,
        modifiedCount: 1 || 0, //depends on if any record got updated or not
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1 || 0,
    };
    if (!result.acknowledged) {
        res.status(400).send({ msg: "Updating operation not acknowledged" });
    }
    else if (result.matchedCount == 0) {
        res.status(200).send({ msg: "No Component Master found" });
    }
    else if (result.modifiedCount > 0) {
        res.status(200).send({ msg: "Component Master Updated Successfully" });
    }
    else if (result.matchedCount > 0) {
        res.status(200).send({ msg: "Already upto date" });
    }
    else {
        res
            .status(500)
            .send({ msg: "An unexpected error occurred. Please try again later" });
    }
});
/**
 * findInventory APi call will get all the Inventory  details
 */
app.get("/Inventory/findInventory", async (req, res) => {
    let inventory = await inventoryModel_1.default.find();
    res.status(200).json(inventory);
    //[
    // {
    //   componentMasterId: "CM-001",
    //   componentName: "Tyre",
    //   quantity: 10,
    //   userId: "xxx",
    //   _id: "66faeca1d9b10bced59a7585",
    // },
    // {
    //   componentMasterId: "CM-002",
    //   componentName: "CPU",
    //   quantity: 20,
    //   userId: "xxx",
    //   _id: "66faeca1d9b10bced59a7588",
    // },
    //]
});
/**
 *  To findInventory APi to get from component List by component name
 */
const componentList = [
    {
        _id: "66fb7eea86ea2d7cf5743791",
        componentMasterId: "1",
        qrCode: "",
        status: "available",
        componentId: "COM001",
        componentName: "Engine",
    },
    {
        _id: "66fb8ffb87fb2d8df5743702",
        componentMasterId: "2",
        qrCode: "",
        status: "pending",
        componentId: "COM002",
        componentName: "Transmission",
    },
];
/**
 *  To findInventory APi to get from component List by component MasterId
 */
app.get("/Inventory/findComponentsByMasterIds/:componentMasterId", (req, res) => {
    const componentMasterId = req.params.componentMasterId;
    let components;
    if (componentMasterId == "all") {
        components = componentList;
        res.status(200).send(components);
    }
    else {
        components = componentList.filter((item) => item.componentMasterId === componentMasterId);
        res.status(200).send(components);
    }
    res.status(404).send({ msg: "error" });
});
// POST API to create a new component in the component list
app.post("/componentList/createComponent", (req, res) => {
    const { componentMasterId, componentId, componentName, qrCode, currentOwner, wareHouseLocation, batchNumber, createdBy, } = req.body;
    // Simulating the creation of a new component in the component list
    // const newComponent = {
    //   componentMasterId: componentMasterId || "CM-001",
    //   componentId: componentId || "COM001",
    //   componentName: componentName || "Engine",
    //   qrCode: qrCode || "",
    //   currentOwner: currentOwner || "Owner1",
    //   wareHouseLocation: wareHouseLocation || "Warehouse A",
    //   batchNumber: batchNumber || "BATCH-001",
    //   createdBy: createdBy || "User1",
    //   createdOn: new Date().toISOString(),
    //   updatedOn: new Date().toISOString(),
    // };
    // Responding with the created component
    res.status(201).send({
        componentMasterId: "CM-001",
        componentId: "C-001",
        componentName: "Component A",
        qrCode: "",
        currentOwner: "Owner1",
        wareHouseLocation: "Warehouse A",
        batchNumber: "BATCH-001",
        createdBy: "User1",
        createdOn: "2024-10-21T11:07:15.603Z",
        updatedOn: "2024-10-21T11:07:15.605Z",
    });
});
// GET API to retrieve all components in the component list
app.get("/componentList/findAllComponents", (req, res) => {
    res.status(200).send([
        {
            componentMasterId: "CM-001",
            componentId: "C-001",
            componentName: "Component A",
            qrCode: "",
            category: "Electronics",
            sentToDelivery: true,
            batchNumber: "BATCH-001",
            location: "Warehouse A",
            createdBy: "User1",
            createdOn: "2024-10-18T00:00:00.000Z",
            updatedOn: "2024-10-18T00:00:00.000Z",
            _id: "66fb7eea86ea2d7cf5743791",
        },
        {
            componentMasterId: "CM-002",
            componentId: "C-002",
            componentName: "Component B",
            qrCode: "QR12345",
            category: "Mechanical",
            sentToDelivery: false,
            batchNumber: "BATCH-002",
            location: "Warehouse B",
            createdBy: "User2",
            createdOn: "2024-10-17T00:00:00.000Z",
            updatedOn: "2024-10-17T00:00:00.000Z",
            _id: "66fb7eea86ea2d7cf5743792",
        },
        {
            componentMasterId: "CM-003",
            componentId: "C-003",
            componentName: "Component C",
            qrCode: "",
            category: "Electrical",
            sentToDelivery: true,
            batchNumber: "BATCH-003",
            location: "Warehouse C",
            createdBy: "User3",
            createdOn: "2024-10-16T00:00:00.000Z",
            updatedOn: "2024-10-16T00:00:00.000Z",
            _id: "66fb7eea86ea2d7cf5743793",
        },
    ]);
});
// PUT API to update an existing component in the component list
app.put("/componentlist/updateComponent", (req, res) => {
    const { componentId, componentName, status, wareHouseLocation } = req.body;
    let result = {
        acknowledged: true,
        modifiedCount: 1,
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1 || 0,
    };
    if (!result.acknowledged) {
        res.status(400).send({ msg: "Updated operation not acknowledged" });
    }
    else if (result.matchedCount == 0) {
        res.status(200).send({ msg: "No record found" });
    }
    else if (result.modifiedCount > 0) {
        res.status(200).send({ msg: "Component Master Updated Successfully" });
    }
    else if (result.matchedCount > 0) {
        res.status(200).send({ msg: "Already upto date" });
    }
    else {
        res
            .status(500)
            .send({ msg: "An unexpected error occurred. Please try again later" });
    }
});
// GET API to find a specific component by its name
app.get("/componentList/:compName", (req, res) => {
    const compName = req.params.compName;
    res.status(200).send({
        componentMasterId: "CM-001",
        componentId: "C-001",
        componentName: compName,
        qrCode: "",
        category: "Electronics",
        sentToDelivery: true,
        batchNumber: "BATCH-001",
        location: "Warehouse A",
        createdBy: "User1",
        createdOn: "2024-10-18T00:00:00.000Z",
        updatedOn: "2024-10-18T00:00:00.000Z",
        _id: "66fb7eea86ea2d7cf5743791",
    });
});
////Purchase Order  --POST API
app.post("/poorder/createpoorder", (req, res) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    res.status(201).send({
        _id: "102345678911",
        description: (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : "Ordered 4 MRF tyres for car",
        orderedBy: (_d = (_c = req.body) === null || _c === void 0 ? void 0 : _c.orderedBy) !== null && _d !== void 0 ? _d : "Sachin",
        orderDetails: (_f = (_e = req.body) === null || _e === void 0 ? void 0 : _e.orderDetails) !== null && _f !== void 0 ? _f : [
            {
                componentMasterName: "Tyres",
                quantity: 4,
                expectedDate: "22-10-2023",
            },
        ],
        orderedTo: (_h = (_g = req.body) === null || _g === void 0 ? void 0 : _g.orderedTo) !== null && _h !== void 0 ? _h : "MRF",
        address: (_k = (_j = req.body) === null || _j === void 0 ? void 0 : _j.address) !== null && _k !== void 0 ? _k : "Hyderabad",
        orderedDate: (_m = (_l = req.body) === null || _l === void 0 ? void 0 : _l.orderedDate) !== null && _m !== void 0 ? _m : "18-10-2023",
        poId: (_p = (_o = req.body) === null || _o === void 0 ? void 0 : _o.poId) !== null && _p !== void 0 ? _p : "5678",
    });
});
//////Transaction GET API
app.get("/Transaction/findTransaction", async (req, res) => {
    let transaction = await transactionmodel_1.default.find();
    res.status(200).json(transaction);
    //     {
    //       poId: "PO001",
    //       componentName: ["COM001,COMOO2"],
    //       poCreationDate: "20-10-2024",
    //       sentDate: "18-10-2024",
    //       receivedDate: "20-10-2024",
    //       grnNumber: "GRN001",
    //       status: "completed",
    //       feedback: "This is good product",
    //     },
    //     {
    //       poId: "PO002",
    //       componentId: ["COM004,COMOO2"],
    //       from: "sup002",
    //       to: "cus B",
    //       sentDate: "18-10-2024",
    //       grnNumber: "GRN002",
    //       status: "completed",
    //       feedback: "This is good product",
    //     },
    //   ]);
    // });
    // //api to get grn info
    // app.get("/getGrnInfo/:GRNId", (req: Request, res: Response) => {
    //   const GRNId = req.params.GRNId;
    //   res.status(200).send([
    //     {
    //       poId: "PO001",
    //       componentName: ["COM001,COMOO2"],
    //       poCreationDate: "20-10-2024",
    //       sentDate: "18-10-2024",
    //       receivedDate: "20-10-2024",
    //       grnNumber: GRNId || "GRN001",
    //       status: "completed",
    //       feedback: "This is good product",
    //     },
    //   ]);
});
app.get("/getGrnInfo/:GRNId", (req, res) => {
    const GRNId = req.params.GRNId;
    res.status(200).send([
        {
            poId: "PO001",
            componentName: ["COM001,COMOO2"],
            poCreationDate: "20-10-2024",
            sentDate: "18-10-2024",
            receivedDate: "20-10-2024",
            grnNumber: GRNId || "GRN001",
            status: "completed",
            feedback: "This is good product",
        },
    ]);
});
app.get("/poorder", (req, res) => {
    res.status(200).send([
        {
            poId: "5678",
            components: ["Tyres(COM001)"],
            createdOn: "",
            status: "pending",
            grnList: ["GRN1", "GRN2", "GRN3"],
        },
    ]);
});
//Batch Apis
//to create a Batch
//api to get grn info
app.post("/batch/createBatch", (req, res) => {
    const { batchNo, componentDetails, batchStartDate, batchEndDate, createdBy } = req.body;
    res.status(201).send({
        batchNo: batchNo || "B-001",
        componentDetails: componentDetails || [
            { componentMasterId: "CM-001", quantity: 10 },
            { componentMasterId: "CM-002", quantity: 50 },
        ],
        batchStartDate: batchStartDate || "20/12/2025",
        batchEndDate: batchEndDate || "20/2/2026",
        createdBy: createdBy || "User123",
    });
});
//to display all the batches
app.get("/batch/findAllBatches", (req, res) => {
    res.status(200).send([
        {
            batchNo: "B-001",
            componentDetails: [
                { componentMasterId: "CM-001", quantity: 10 },
                { componentMasterId: "CM-002", quantity: 50 },
            ],
            batchStartDate: "20/12/2025",
            batchEndDate: "20/02/2026",
            createdBy: "User123",
        },
        {
            batchNo: "B-002",
            componentDetails: [
                { componentMasterId: "CM-030", quantity: 100 },
                { componentMasterId: "CM-012", quantity: 80 },
            ],
            batchStartDate: "20/05/2025",
            batchEndDate: "20/01/2026",
            createdBy: "User123",
        },
        {
            batchNo: "B-003",
            componentDetails: [
                { componentMasterId: "CM-010", quantity: 60 },
                { componentMasterId: "CM-022", quantity: 5 },
            ],
            batchStartDate: "20/09/2025",
            batchEndDate: "20/03/2026",
            createdBy: "User123",
        },
    ]);
});
//to get single batch details
app.get("/batch/:batchNo", (req, res) => {
    const batchNo = req.params.batchNo;
    res.status(200).send({
        batchNo: batchNo,
        componentDetails: [
            { componentMasterId: "CM-010", quantity: 60 },
            { componentMasterId: "CM-022", quantity: 5 },
        ],
        batchStartDate: "20/09/2025",
        batchEndDate: "20/03/2026",
        createdBy: "User123",
    });
});
//to update or edit the batch
app.put("/batch/updateBatch", (req, res) => {
    const data = req.body;
    let result = {
        acknowledged: true,
        modifiedCount: 1 || 0, //depends on if any record got updated or not
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1 || 0,
    };
    if (!result.acknowledged) {
        res.status(400).send({ msg: "Updating operation not acknowledged" });
    }
    else if (result.matchedCount == 0) {
        res.status(200).send({ msg: "No Batch found" });
    }
    else if (result.modifiedCount > 0) {
        res.status(200).send({ msg: "Batch Updated Successfully" });
    }
    else if (result.matchedCount > 0) {
        res.status(200).send({ msg: "Already upto date" });
    }
    else {
        res
            .status(500)
            .send({ msg: "An unexpected error occurred. Please try again later" });
    }
});
let port = 7000;
app.listen(port, () => {
    console.log("server started on ", +port);
});
