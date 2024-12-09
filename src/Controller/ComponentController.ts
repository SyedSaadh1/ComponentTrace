import { Request, Response } from "express";
import AutogenerateId from "../AutogenerateId/AutogenerateId";
import componentListBody from "../Validations/ComponentList.validation";
import ClRepo from "../Repository/ComponentListRepository";
import InventoryRepo from "../Repository/InventoryRepository";
import BatchRepo from "../Repository/BatchRepo";
import Batchmodels from "../Models/BatchModel";
import QRCode from "qrcode";
import CMRepo from "../Repository/ComponentMasterRepository";

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

  // Store multiple components based on quantity
  async storeComponents(req: Request, res: Response): Promise<any> {
    const componentData = req.body;

    const { componentName, componentMasterId, quantity } = componentData;

    // Prepare QR Code data
    let qrData = {
      componentName,
      componentMasterId,
      createdAt: new Date().toISOString(),
    };

    try {
      const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
      const { error, value } = componentListBody.validate(componentData);
      if (error) {
        return res
          .status(400)
          .json({ msg: "Validation error", error: error.details });
      }

      const userSession = req.userSession;
      const { userName } = userSession;

      const batchId = await AutogenerateId.batchIdGenerate();

      const savedComponents = [];
      const createdIds = [];
      for (let i = 0; i < value.quantity; i++) {
        const componentId = await AutogenerateId.clIdGenerate();

        createdIds.push(componentId);
        const newComponentData = {
          ...value,
          qrCode,
          componentId,
          currentOwner: userName,
          createdBy: userName,
          batchNo: batchId,
        };

        // Store each component with unique data in the database
        const result = await ClRepo.storeComponents(newComponentData);
        savedComponents.push(result);
      }
      await InventoryRepo.updateQuantity(componentMasterId, quantity, userName);
      const batchBody = {
        batchNo: batchId,
        componentName: componentName,
        createdBy: "User123",
        componentIds: createdIds,
      };
      await BatchRepo.createBatch(batchBody);

      res.status(201).json({
        msg: "Components created successfully",
        data: savedComponents,
      });
    } catch (error) {
      res.status(500).json({ msg: `Error in creating components: ${error}` });
    }
  }

  // Update existing components
  async updateComponents(req: Request, res: Response): Promise<any> {
    try {
      const { componentId, componentName, wareHouseLocation, ...updateFields } =
        req.body;

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
  async getAvailableItems(req: Request, res: Response) {
    const { userName } = req.userSession;
    try {
      const componentMasterId = req.params.componentMasterId;
      const subComponents = await CMRepo.getSubComponents(componentMasterId);
      const quantities: any = [];
      if (subComponents) {
        await Promise.all(
          subComponents.components.map(async (item: any) => {
            const found = await InventoryRepo.findComponents(
              item.componentMasterId
            );
            const itemQuantity = item.quantity;
            const foundQuantity: any = found?.quantity;
            const usableQuantity = Math.ceil(foundQuantity / itemQuantity);
            quantities.push(usableQuantity);
          })
        );
        const max = Math.min(quantities);
        return res
          .status(200)
          .send({ msg: `can make max of ${max} ${componentMasterId}` });
      }
      return res.status(200).send({ msg: "No sub components present" });
    } catch (error) {}
  }
}

export default ComponentController;
