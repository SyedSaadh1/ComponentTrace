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
    res.status(200).send([
      {
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
          { componentName: "Tyre", quantity: 4 },
          {
            componentName: "Engine",
            quantity: 1,
          },
          {
            componentName: "Seats",
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
  }
);

// POST API to create a new ComponentMaster
app.post(
  "/componentMaster/createComponentMaster",
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
      componentMasterId: componentMasterId || "CM-003",
      componentMasterName: componentMasterName || "Keyboard",
      componentMasterDescription: componentMasterDescription || "Used for PCs",
      componentImage: componentImage || "https://images.com/mouse.png",
      components: components || [
        {
          componentMasterId: "CM-002",
          quantity: 100,
        },
        {
          componentMasterId: "CM-001",
          quantity: 1,
        },
      ],
      isFinalProduct: isFinalProduct || false,
      category: category || "Plastic",
      productionStatus: productionStatus || "Active",
      createdBy: createdBy || "user123",
      createdOn: new Date(),
      updatedOn: new Date(),
    });
  }
);

app.put(
  "/componentMaster/updateComponentMaster",
  (req: Request, res: Response) => {
    const data = req.body;

    let result = {
      acknowledged: true,
      modifiedCount: 1 || 0, //depends on if any record got updated or not
      upsertedId: null,
      upsertedCount: 0,
      matchedCount: 1 || 0,
    };
    if (!result.acknowledged) {
      res.status(400).send({ msg: "Updated operation not acknowledged" });
    } else if (result.matchedCount == 0) {
      res.status(200).send({ msg: "No record found" });
    } else if (result.modifiedCount > 0) {
      res.status(200).send({ msg: "Component Master Updated Successfully" });
    } else if (result.matchedCount > 0) {
      res.status(200).send({ msg: "Already upto date" });
    } else {
      res
        .status(500)
        .send({ msg: "An unexpected error occurred. Please try again later" });
    }
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

app.get("/Inventory/findComponentsByMasterIds/:componentMasterIds", (req: Request, res: Response) => {
  const componentMasterIds = req.params.componentMasterIds.split(','); 
  let components;
  if(req.params.componentMasterIds == "all"){
    components = componentList;
  }else
   components = componentList.filter(item => componentMasterIds.includes(item.componentMasterId));

  if (components.length > 0) {
    res.status(200).send(components); 
  } else {
    res.status(404).send({
      error: "No components found for the given componentMasterIds",
    });
  }
});

//PurchaseOrder(PO) code is Below

app.post("/poorder/createpoorder", (req, res) => {
  res.status(201).send({
    _id: "102345678911",
    description: req.body?.description ?? "Ordered 4 MRF tyres for car",
    orderedBy: req.body?.orderedBy ?? "Sachin",
    orderDetails: req.body?.orderDetails ?? [
      {
        componentMasterName: "Tyres",
        quantity: 4,
        expectedDate: "22-10-2023",
      },
    ],
    orderedTo: req.body?.orderedTo ?? "MRF",
    address: req.body?.address ?? "Hyderabad",
    orderedDate: req.body?.orderedDate ?? "18-10-2023",
    poId: req.body?.poId ?? "5678",
  });
});
// POST API to create a new component in the component list
app.post("/componentList/createComponent", (req, res) => {
  const {
    componentMasterId,
    componentId,
    componentName,
    qrCode,
    currentOwner,
    wareHouseLocation,
    batchNumber,
    createdBy,
  } = req.body;
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
app.get("/componentList/findAllComponents", (req: Request, res: Response) => {
  res.status(200).send([{
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
  },
  { componentMasterId: "CM-002",
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
    _id: "66fb7eea86ea2d7cf5743792"},
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
      _id: "66fb7eea86ea2d7cf5743793"
    }]);
});
// PUT API to update an existing component in the component list
app.put("/componentlist/updateComponent", (req: Request, res: Response) => {
  const { componentId, componentName, status, wareHouseLocation } = req.body;

  let result = {
    acknowledged: true,
    modifiedCount: 1 || 0, //depends if any record got updated or not
    upsertedId: null,
    upsertedCount: 0,
    matchedCount: 1 || 0,
  };
  if (!result.acknowledged) {
    res.status(400).send({ msg: "Updated operation not acknowledged" });
  } else if (result.matchedCount == 0) {
    res.status(200).send({ msg: "No record found" });
  } else if (result.modifiedCount > 0) {
    res.status(200).send({ msg: "Component Master Updated Successfully" });
  } else if (result.matchedCount > 0) {
    res.status(200).send({ msg: "Already upto date" });
  } else {
    res
      .status(500)
      .send({ msg: "An unexpected error occurred. Please try again later" });
  }
}
);
// GET API to find a specific component by its name
app.get("/componentList/:compName", (req: Request, res: Response) => {
  const compName = req.params.compName;
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
    _id: "66fb7eea86ea2d7cf5743791",
  });
});
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
});



let port = 7000;
app.listen(port, () => {
  console.log("server started on ", +port);
});
