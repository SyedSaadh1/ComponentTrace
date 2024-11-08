import express from "express";
import transactionsRouter from "./Router/transactionsRouter";
import DB from "./Config/dbconfig";

const app = express();
app.use(express.json());
app.use("/transactions", transactionsRouter);
DB.DBConnect();
app.listen(7000, () => {
  console.log("Server started on port 7000");
});
