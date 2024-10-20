import express = require("express");
import { Request, Response } from "express-serve-static-core";
let app = express();
app.use(express.json());
// apis here.......

/**
 * findComponentMaster APi call will get all the Component Master details
 */
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
});
//createComponentMaster API will help us to create a Component Master
app.post("/api/createComponentMaster", (req: Request, res: Response) => {
  = req.body;
});

app.listen(port, () => {
  console.log("server started on ", +port);
});
