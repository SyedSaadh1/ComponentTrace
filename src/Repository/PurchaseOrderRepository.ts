import { string } from "joi";
import purchaseOrderModel from "../Models/PurchaseOrderModel";
import PurchaseOrder, { IPurchaseOrder } from "../Models/PurchaseOrderModel";

class PORepository {
  async getLastInsertedId() {
    try {
      return await purchaseOrderModel.findOne().sort({ _id: -1 }).limit(1);
    } catch (error) {
      throw new Error(
        "Error Encountered while fetching last inserted Id : " + error
      );
    }
  }

  async createPo(order: IPurchaseOrder) {
    return await PurchaseOrder.create(order);
  }
  async findOrder(filter = {}) {
    return await purchaseOrderModel.findOne(filter);
  }
  async updatePOStatus(poId: string) {
    await purchaseOrderModel.updateOne(
      { poId },
      {
        $set: {
          orderStatus: "Completed",
        },
      }
    );
  }
  async updateDeliveredComponents(component: any, poId: string) {
    try {
      // to find the order document
      console.log(poId);
      const result = await purchaseOrderModel.findOne({ poId: poId });
      console.log(result);
      if (!result) {
        throw new Error("Order not found");
      }

      // to access the specific component we are trying to get
      const foundComponent = result.deliveredComponents.find(
        (item) => item.componentMasterId === component.componentMasterId
      );

      if (!foundComponent) {
        throw new Error("Component not found in deliveredComponents array");
      }

      const presentQuantity = foundComponent.quantity;
      const remainingQuantity = presentQuantity - component.quantity;

      // Update the quantity in the deliveredComponents array of specific component
      await purchaseOrderModel.updateOne(
        {
          poId,
          "deliveredComponents.componentMasterId": component.componentMasterId,
        },
        {
          $set: {
            "deliveredComponents.$.quantity": remainingQuantity,
          },
        }
      );

      return remainingQuantity;
    } catch (error) {
      console.error("Error updating delivered component quantity:", error);
      throw new Error("Failed to update component quantity. " + error);
    }
  }
}

export default new PORepository();
