import { Request, Response } from 'express';
import AutogenerateId from "../AutogenerateId/AutogenerateId";
import componentListBody from "../Validations/componentList.validation";
import ClRepo from '../Repository/componentListRepository';

class ComponentController {
  // Find all components
  async findAllComponents(req: Request, res: Response): Promise<any> {
    try {
      const filter = req.query || {}; // Optional filter from query params
      console.log("filter-------->", filter);
      const result:any = await ClRepo.findAllComponents(filter);
      console.log("result :- ",result);
      if (!result.length) {
         return res.status(404).send({ msg: "No components found" });
      } else {
        return res.status(200).send(result);
      }
    } catch (error) {
      res.status(500).send({ msg: "Error fetching components: " + error });
    }
  }

  // Store new components with auto-generated ID
  async storeComponents(req: Request, res: Response): Promise<any> {
    try {
      // Validate request body
      const { error, value } = componentListBody.validate(req.body);
      if (error) {
        return res.status(400).json({ msg: "Validation error", error: error.details });
      }

      // Generate a unique ID for each component in the list
      const componentId=await AutogenerateId.clIdGenerate();
      value.componentId=componentId;

      // Store components in the database
      const result = await ClRepo.storeComponents(value);
      res.status(201).json({ msg: "Components created successfully", data: result });
    } catch (error) {
      res.status(500).json({ msg: "Error in creating components: " + error });
    }
  }

  // Update existing components
  async updateComponents(req: Request, res: Response): Promise<any> {
    try {
      const { componentId, componentName, wareHouseLocation, ...updateFields } = req.body;
      if (!componentId) {
        return res.status(400).json({ msg: "Component ID is required" });
      }

      // Add componentName and wareHouseLocation to updateFields if provided
      if (componentName) updateFields.componentName = componentName;
      if (wareHouseLocation) updateFields.wareHouseLocation = wareHouseLocation;

      const result = await ClRepo.updateComponents(componentId, updateFields); // Pass componentId as a string
      if (result.modifiedCount > 0) {
        res.status(200).json({ msg: "Component updated successfully" });
      } else if (result.matchedCount > 0) {
        res.status(200).json({ msg: "No changes made to the component" });
      } else {
        res.status(404).json({ msg: "Component not found" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error in updating component: " + error });
    }
  }

  // Find component by name
  async findComponentByName(req: Request, res: Response): Promise<any> {
    try {
      const { compName } = req.params;
      if (!compName) {
        return res.status(400).json({ msg: "Component name is required" });
      }
      const result = await ClRepo.findCompByName(compName);
      if (!result.length) {
        return res.status(404).json({ msg: "Component not found" });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ msg: "Error in finding component: " + error });
    }
  }
}

export default ComponentController;
