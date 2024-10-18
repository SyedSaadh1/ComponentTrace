import { ComponentList } from "../models/componentInterface";
import * as repository from "../repositories/componentListRepository";
import { Request, Response } from "express";
 
export let findAllComponents = async (req:Request,res:Response)=> {
    let result = await repository.findAllComponents();  
    try{
        res.json(result);
     }catch(err){
        res.json(err);
     }
}
 
 
export let storeComponents= async (req:Request,res:Response)=> {
let components:ComponentList= req.body;
try{
 let result = await repository.storeComponents(components);  
   //res.json(result);
   res.json({"msg":"Record inserted successfully"});
}catch(err){
   //res.json(ex);
   res.json({"msg":"Record didn't inserted"});
}
}
export let updateComponents = async (req:Request,res:Response)=> {
let components:ComponentList = req.body;
let result = await repository.updateComponents(components);  
try{
      if(result.modifiedCount>0){
      res.send("Record updated successfully")
      }else if(result.matchedCount>0){
      res.send("Record exist but didn't update")
      }else {
      res.send("Record didn't update")
      }
}catch(err){
   res.send(err);
}
}
export let deleteComponents = async (req:Request,res:Response)=> {
let componentMasterId:Number = eval(req.params._id);
let result = await repository.deleteComponents(componentMasterId);  
try{
      if(result.deletedCount>0){
             res.send("Record deleted successfully")
      }else {
             res.send("Record not present")
      }
}catch(err){
   res.send(err);
}
}
 