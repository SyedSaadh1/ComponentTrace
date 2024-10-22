import express = require("express");
import { Request, Response } from "express";
let app = express();
app.use(express.json());
// apis here.......

/**
 * findComponentMaster APi call will get all the Component Master details
 */
app.get(
  "/componentMaster/findAllComponentMaster",
  (req: Request, res: Response) => {
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
  }
);

// POST API to create a new ComponentMaster
app.post(
  "componentMaster/createComponentMaster",
  (req: Request, res: Response) => {
    const {
      componentMasterId,
      componentMasterName,
      componentMasterDescription,
      componentImage,
      components,
      isFinalProduct,
      category,
      productionStatus,
      createdBy,
    } = req.body; //this is req body format

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
  }
);

app.put(
  "/componentMaster/updateComponentMaster",
  (req: Request, res: Response) => {
    const { componentMasterName, components } = req.body;
    res.status(200).send({
      acknowledged: true,
      modifiedCount: 1 || 0, //depends on if any record got updated or not
      upsertedId: null,
      upsertedCount: 0,
      matchedCount: 1 || 0,
    });
  }
);
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

<<<<<<< Updated upstream
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
        expectedDate: "22-10-2023",
      },
    ],
    orderedTo: "MRF",
    address: "Hyderabad",
    orderedDate: "18-10-2023",
    poId: "5678",
  });
});
app.post("/componentList/createComponent", (req, res) => {
  const { componentMasterId, componentId, componentName, qrCode, currentOwner, wareHouseLocation, batchNumber, createdBy } = req.body;
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
      "componentMasterId": "CM-001",
      "componentId": "C-001",
      "componentName": "Component A",
      "qrCode": "",
      "currentOwner": "Owner1",
      "wareHouseLocation": "Warehouse A",
      "batchNumber": "BATCH-001",
      "createdBy": "User1",
      "createdOn": "2024-10-21T11:07:15.603Z",
      "updatedOn": "2024-10-21T11:07:15.605Z"
  });
});
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
=======
app.get("/Transaction/findTransaction", (req: Request, res: Response) => {
  res.status(200).send([
    {
      TransactionId: "TN0001",
      poId: "PO001",
      componentId: ["COM001,COMOO2"],
      from: "sup001",
      to: "cus A",
      sentDate: "18-10-2024",
      receivedDate: "20-10-2024",
      grnNumber: "GRN001",
      componentSummary: [
        {
          componentMasterId: "id1",
          quantity: 2,
          batchNo: "1",
        },
        {
          componentMasterId: "id2",
          quantity: 5,
          batchNo: "2",
        },
      ],
      receivedByCustomer: true,
      status: "completed",
      feedback: "This is good product",
    },
    {
      TransactionId: "TN002",
      poId: "PO002",
      componentId: ["COM004,COMOO2"],
      from: "sup002",
      to: "cus B",
      sentDate: "18-10-2024",
      receivedDate: "20-10-2024",
      grnNumber: "GRN002",
      componentSummary: [
        {
          componentMasterId: "id6",
          quantity: 2,
          batchNo: "1",
        },
        {
          componentMasterId: "id5",
          quantity: 5,
          batchNo: "2",
        },
      ],

      receivedByCustomer: true,
      status: "completed",
      feedback: "This is good product",
    },
  ]);
>>>>>>> Stashed changes
});

let port = 7000;
app.listen(port, () => {
  console.log("server started on ", +port);
});
