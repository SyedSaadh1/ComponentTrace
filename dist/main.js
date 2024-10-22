"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
let app = express();
app.use(express.json());
// apis here.......
/**
 * findComponentMaster APi call will get all the Component Master details
 */
app.get("/componentMaster/findAllComponentMaster", (req, res) => {
    res.status(200).send({
        componentMasterId: "CM-001",
        componentMasterName: "Keyboard",
        componentMasterDescription: "Used for Vehivles",
        componentImage: "https://images.com/tyre.png",
        components: [
            { componentName: "Keys", quantity: 100 },
            {
                componentName: "Mother Board",
                quantity: 1,
            },
        ],
        isFinalProduct: "No",
        category: "Rubber",
        productionStatus: "Active",
        createdBy: "miway",
        createdOn: "2024-10-18T00:00:00.000Z",
        updatedOn: "2024-10-18T00:00:00.000Z",
        _id: "67122520a5768407fca14e22",
    });
});
// POST API to create a new ComponentMaster
app.post("componentMaster/createComponentMaster", (req, res) => {
    const { componentMasterId, componentMasterName, componentMasterDescription, componentImage, components, isFinalProduct, category, productionStatus, createdBy, } = req.body; //this is req body format
    // Here you could add logic to save the component in a database
    // For now, we are just simulating the creation and returning the same data back.
    // const newComponentMaster = {
    //   componentMasterId: componentMasterId || "CM-002",
    //   componentMasterName,
    //   componentMasterDescription,
    //   componentImage,
    //   components,
    //   isFinalProduct,
    //   category,
    //   productionStatus,
    //   createdBy,
    //   createdOn: new Date().toISOString(),
    //   updatedOn: new Date().toISOString(),
    // };
    // Responding with the created component
    res.status(201).send({
        componentMasterId: "CM-003",
        componentMasterName: "Keyboard",
        componentMasterDescription: "Used for PCs",
        componentImage: "https://images.com/mouse.png",
        components: [
            {
                componentMasterId: "CM-002",
                quantity: 100,
            },
            {
                componentMasterId: "CM-001",
                quantity: 1,
            },
        ],
        isFinalProduct: "Yes",
        category: "Plastic",
        productionStatus: "Active",
        createdBy: "user123",
        createdOn: "2024-10-21T11:00:55.290Z",
        updatedOn: "2024-10-21T11:00:55.290Z",
    });
});
app.put("/componentMaster/updateComponentMaster", (req, res) => {
    const { componentMasterName, components } = req.body;
    res.status(200).send({
        acknowledged: true,
        modifiedCount: 1 || 0, //depends on if any record got updated or not
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1 || 0,
    });
});
/**
 * findInventory APi call will get all the Inventory  details
 */
app.get("/Inventory/findInventory", (req, res) => {
    res.status(200).send({
        componentMasterId: "CM-001",
        componentName: "Tyre",
        quantity: 10,
        userId: "xxx",
        _id: "66faeca1d9b10bced59a7585",
    });
});
//PurchaseOrder(PO) code is Below
// app.post("/poorder/createpoorder", (req, res) => {
//   res.status(201).send({
//     _id: "12345678911",
//     description: req.body?.description ?? "Ordered 4 MRF tyres for car",
//     orderedBy: "Sachin",
//     orderDetails: [
//       {
//         componentMasterName: "Tyres",
//         quantity: 4,
//         expectedDate: "22-10-2023",
//       },
//     ],
//     orderedTo: "MRF",
//     address: "Hyderabad",
//     orderedDate: "18-10-2023",
//     poId: "5678",
//   });
// });
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
let port = 7000;
app.listen(port, () => {
    console.log("server started on ", +port);
});
