import express = require("express");
import { Request, Response } from "express";
let app = express();
app.use(express.json());
// apis here.......

/**
 * findComponentMaster APi call will get all the Component Master details
 */
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

// // POST API to create a new ComponentMaster
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


//PurchaseOrder(PO) code is Below



app.post("/poorder/createpoorder", (req, res) => {

  res.status(201).send({
    _id: "12345678911",
    description: req.body?.description ?? "Ordered 4 MRF tyres for car",
    orderedBy: "Sachin",
    orderDetails: [
      {

        componentMasterName: "Tyres",
        quantity: 4,
        expectedDate: "22-10-2023"
      }
    ],
    orderedTo: "MRF",
    address: "Hyderabad",
    orderedDate: "18-10-2023",
    poId: "5678"
  });
});




let port = 7000;
app.listen(port, () => {
  console.log("server started on ", +port);
});
