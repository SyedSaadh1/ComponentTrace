import CMRepo from "../Repository/ComponentMasterRepository";
import PORepo from "../Repository/purchaseOrderRepository";
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
    console.log(lastInsertedPOId);
    if (lastInsertedPOId) {
      const id = lastInsertedPOId.poId;
      const prefix: string = id.slice(0, 4);
      let sequence: number = parseInt(id.slice(4));
      sequence++;
      console.log(prefix + sequence);
      return prefix + sequence.toString().padStart(2, "0");
    } else {
      const prefix: string = "PO-0";
      const sequence: number = 1;
      return prefix + sequence.toString().padStart(2, "0");
    }
  }
}

export default new AutogenerateId();
