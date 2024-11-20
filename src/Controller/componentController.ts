import { Request, Response } from "express";
import AutogenerateId from "../AutogenerateId/AutogenerateId";
import componentListBody from "../Validations/componentList.validation";
import ClRepo from "../Repository/componentListRepository";
import InventoryRepo from "../Repository/InventoryRepository";

class ComponentController {
  async findAllComponents(req: Request, res: Response): Promise<void> {
    try {
      const filter = req.query || {};
      console.log("Filter applied: ", filter);

      const components = await ClRepo.findAllComponents(filter);

      if (!components.length) {
        res.status(404).json({ msg: "No components found" });
        return;
      }

      res.status(200).json(components);
    } catch (error) {
      console.error("Error fetching components:", error);
      res.status(500).json({ msg: "Error fetching components", error });
    }
  }

  async storeComponents(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = componentListBody.validate(req.body);
      if (error) {
        res.status(400).json({ msg: "Validation error", error: error.details });
        return;
      }

      const availableQuantity = await InventoryRepo.getAvailableQuantity(
        value.componentMasterId
      );

      if (availableQuantity < value.quantity) {
        res.status(400).json({
          msg: "Insufficient quantity in inventory",
          availableQuantity,
        });
        return;
      }

      const savedComponents = [];
      for (let i = 0; i < value.quantity; i++) {
        const componentId = await AutogenerateId.clIdGenerate();
        const componentData = { ...value, componentId };

        const component = await ClRepo.storeComponent(componentData);
        savedComponents.push(component);
      }

      res.status(201).json({
        msg: "Components created successfully",
        data: savedComponents,
      });
    } catch (error) {
      console.error("Error creating components:", error);
      res.status(500).json({ msg: "Error creating components", error });
    }
  }

  async updateComponents(req: Request, res: Response): Promise<void> {
    try {
      const { componentId, ...updateFields } = req.body;

      if (!componentId) {
        res.status(400).json({ msg: "Component ID is required" });
        return;
      }

      const updateResult = await ClRepo.updateComponent(componentId, updateFields);

      if (updateResult.modifiedCount > 0) {
        res.status(200).json({ msg: "Component updated successfully" });
      } else if (updateResult.matchedCount > 0) {
        res.status(200).json({ msg: "No changes made to the component" });
      } else {
        res.status(404).json({ msg: "Component not found" });
      }
    } catch (error) {
      console.error("Error updating component:", error);
      res.status(500).json({ msg: "Error updating component", error });
    }
  }

  async findComponentByName(req: Request, res: Response): Promise<void> {
    try {
      const { compName } = req.params;

      if (!compName) {
        res.status(400).json({ msg: "Component name is required" });
        return;
      }

      const components = await ClRepo.findComponentByName(compName);

      if (!components.length) {
        res.status(404).json({ msg: "Component not found" });
        return;
      }

      res.status(200).json(components);
    } catch (error) {
      console.error("Error finding component by name:", error);
      res.status(500).json({ msg: "Error finding component", error });
    }
  }

  async createSubComponents(req: Request, res: Response): Promise<void> {
    try {
      const { parentComponentId, subComponents } = req.body;

      if (!parentComponentId || !subComponents?.length) {
        res.status(400).json({
          msg: "Parent component ID and subcomponents data are required",
        });
        return;
      }

      const parentComponent = await ClRepo.findComponentById(parentComponentId);
      if (!parentComponent) {
        res.status(404).json({ msg: "Parent component not found" });
        return;
      }

      for (const subComponent of subComponents) {
        const availableQuantity = await InventoryRepo.getAvailableQuantity(
          subComponent.componentMasterId
        );

        if (availableQuantity < subComponent.quantity) {
          res.status(400).json({
            msg: `Insufficient inventory for componentMasterId: ${subComponent.componentMasterId}`,
            availableQuantity,
          });
          return;
        }

        subComponent.componentId = await AutogenerateId.clIdGenerate();
      }

      const result = await ClRepo.addSubComponents(parentComponentId, subComponents);

      res.status(201).json({
        msg: "Subcomponents created and added successfully",
        result,
      });
    } catch (error) {
      console.error("Error creating subcomponents:", error);
      res.status(500).json({ msg: "Error creating subcomponents", error });
    }
  }
}

export default ComponentController;
