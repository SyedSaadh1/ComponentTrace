import { Request, Response } from 'express';

import AutogenerateId from "../AutogenerateId/AutogenerateId";

import componentListBody from "../Validations/componentList.validation";

import ClRepo from '../Repository/componentListRepository';

import InventoryRepo from '../Repository/InventoryRepository';
 
class ComponentController {

  // Find all components

  async findAllComponents(req: Request, res: Response): Promise<any> {

    try {

      const filter = req.query || {};

      console.log("filter-------->", filter);

      const result: any = await ClRepo.findAllComponents(filter);

      console.log("result :- ", result);

      if (!result.length) {

        return res.status(404).send({ msg: "No components found" });

      } else {

        return res.status(200).send(result);

      }

    } catch (error) {

      res.status(500).send({ msg: "Error fetching components: " + error });

    }

  }
 
  async storeComponents(req: Request, res: Response): Promise<any> {
    try {
      // Validate request body
      const { error, value } = componentListBody.validate(req.body);
      if (error) {
        return res.status(400).json({ msg: "Validation error", error: error.details });
      }

      // Check available quantity in inventory for the componentMasterId
      const availableQuantity = await InventoryRepo.getAvailableQuantity(value.componentMasterId);
      if (availableQuantity < value.quantity) {
        return res.status(200).json({ 
          msg: "Insufficient quantity in inventory", 
          availableQuantity 
        });
      }

      const savedComponents = [];
      for (let i = 0; i < value.quantity; i++) {
        // Generate a unique component ID for each component
        const componentId = await AutogenerateId.clIdGenerate();
        const componentData = {
          ...value,
          componentId, // Unique ID for each entry
        };

        // Store each component with unique ID in the database
        const result = await ClRepo.storeComponents(componentData);
        savedComponents.push(result);

        // increase the inventory quantity by 1 for each created component
        await InventoryRepo.updateQuantity(value.componentMasterId, +1);
      }

      res.status(201).json({ msg: "Components created successfully", data: savedComponents });

    } catch (error) {
      res.status(500).json({ msg: `Error in creating components: ${error}` });
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
 
      const result = await ClRepo.updateComponents(componentId, updateFields);

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

 