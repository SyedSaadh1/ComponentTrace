import express = require("express");
import { Request, Response } from "express-serve-static-core";
let app = express();
app.use(express.json());
// apis here.......
app.get("/api/findComponentMaster", (req: Request, res: express.Response) => {
  res.status(200).send({
    componentMasterId: "CM-001",
    componentMasterName: "Keyboard",
    componentMasterDescription: "Used for Vehivles",
    componentImage: "https://images.com/tyre.png",
    category: "Rubber",
    quantity: 100,
    productionStatus: "Active",
    createdBy: "miway",
    createdOn: "2024-10-18T00:00:00.000Z",
    updatedOn: "2024-10-18T00:00:00.000Z",
    _id: "67122520a5768407fca14e22",
  });
});

let port = 9000;
app.listen(port, () => {
  console.log("server started on ", +port);
});
