 
import * as controller from '../controller/componentController';
import express from 'express';
let router = express.Router();
 
router.get("/findAllComponents",controller.findAllComponents);
router.post("/storeComponents",controller.storeComponents);
router.delete("/deleteComponents/:_id",controller.deleteComponents);
router.put("/updateComponents",controller.updateComponents);
 
export=router;
 
 