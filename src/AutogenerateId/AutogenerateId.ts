import CMRepo from "../Repository/ComponentMasterRepository";
import PORepo from "../Repository/PurchaseOrderRepository";
import CLRepo from "../Repository/ComponentListRepository";
class AutogenerateId {
  async idGenerate() {
    const lastInsertedCMId = await CMRepo.getLastInsertedId();
    console.log(lastInsertedCMId);
    if (lastInsertedCMId) {
      const id = lastInsertedCMId.componentMasterId;
      const prefix: string = id.slice(0, 4);
      let sequence: number = parseInt(id.slice(4));
      sequence++;
      console.log(prefix + sequence);
      return prefix + sequence.toString().padStart(2, "0");
    } else {
      const prefix: string = "CM-0";
      const sequence: number = 1;
      return prefix + sequence.toString().padStart(2, "0");
    }
  }
  async poIdGenerate() {
    const lastInsertedPOId = await PORepo.getLastInsertedId();
    if (lastInsertedPOId) {
      const id = lastInsertedPOId.poId;
      const prefix: string = id.slice(0, 3);
      let sequence: number = parseInt(id.slice(3));
      sequence++;
      return prefix + sequence.toString().padStart(4, "0");
    } else {
      const prefix: string = "PO-";
      const sequence: number = 1;
      return prefix + sequence.toString().padStart(4, "0");
    }
  }
  async clIdGenerate() {
    const lastInsertedCLId = await CLRepo.getLastInsertedId();
    if (lastInsertedCLId) {
      const id = lastInsertedCLId.componentId;
      const prefix: string = id.slice(0, 3); // Extracts "CL-"
      let sequence: number = parseInt(id.slice(3)); // Extracts the numeric part
      sequence++;
      console.log(prefix + sequence);
      return prefix + sequence.toString().padStart(2, "0"); // Pads to ensure two-digit format
    } else {
      const prefix: string = "CL-";
      const sequence: number = 1;
      console.log(prefix + sequence);

      return prefix + sequence.toString().padStart(2, "0");
    }
  }
}

export default new AutogenerateId();
