import express = require("express");
import { Request, Response } from "express";
let app = express();
app.use(express.json());
// apis here.......

/**
 * findComponentMaster APi call will get all the Component Master details
//  */
app.get(
  "/componentMaster/findComponentMaster",
  (req: Request, res: Response) => {
    res.status(200).send({
      componentMasterId: "CM-001",
      componentMasterName: "Keyboard",
      componentMasterDescription: "Used for Vehivles",
      componentImage: "https://images.com/tyre.png",
      isFinalProduct: "No",
      category: "Rubber",
      quantity: 100,
      productionStatus: "Active",
      createdBy: "miway",
      createdOn: "2024-10-18T00:00:00.000Z",
      updatedOn: "2024-10-18T00:00:00.000Z",
      _id: "67122520a5768407fca14e22",
    });
  }
);

// POST API to create a new ComponentMaster
app.post("/createComponentMaster", (req: Request, res: Response) => {
  const {
    componentMasterId,
    componentMasterName,
    componentMasterDescription,
    componentImage,
    isFinalProduct,
    category,
    quantity,
    productionStatus,
    createdBy,
  } = req.body;

  // Here you could add logic to save the component in a database
  // For now, we are just simulating the creation and returning the same data back.

  const newComponentMaster = {
    componentMasterId: componentMasterId || "CM-002",
    componentMasterName,
    componentMasterDescription,
    componentImage,
    isFinalProduct,
    category,
    quantity,
    productionStatus,
    createdBy,
    createdOn: new Date().toISOString(),
    updatedOn: new Date().toISOString(),
  };

  // Responding with the created component
  res.status(201).send(newComponentMaster);
});
// Component List

app.get("/findComponentList", (req: Request, res: Response) => {
  res.status(200).send({
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
    _id: "66fb7eea86ea2d7cf5743791"
  });
});

/**
 * findInventory APi call will get all the Inventory  details
 */
app.get("/Inventory/findInventory", (req: Request, res: Response) => {
  res.status(200).send({
    componentMasterId: "CM-001",
    componentName: "Tyre",
    quantity: 10,
    userId: "xxx",
    _id: "66faeca1d9b10bced59a7585",
  });
});

let port = 7000;
app.listen(port, () => {
  console.log("server started on ", +port);
});
