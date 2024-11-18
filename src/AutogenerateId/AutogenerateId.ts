import CMRepo from "../Repository/ComponentMasterRepository";
import PORepo from "../Repository/PurchaseOrderRepository";
import CLRepo from "../Repository/ComponentListRepository";
import transactionsRepository from "../Repository/TransactionsRepository";
import CounterRepo from "../Repository/CounterRepository";

class AutogenerateId {
  async CMIdGenerate() {
    const lastInsertedCMId = await CMRepo.getLastInsertedId();
    console.log(lastInsertedCMId);
    if (lastInsertedCMId) {
      const id = lastInsertedCMId.componentMasterId;
      const prefix: string = id.slice(0, 4);
      const result = await CounterRepo.getSequence();
      let sequence: number = result.sequence;

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
  async generateGRNNumber() {
    const latestUpdatedRecord = await transactionsRepository.findLatestGRN();
    if (latestUpdatedRecord?.grnNumber) {
      const latestGRN: string = latestUpdatedRecord.grnNumber;
      const prefix: string = latestGRN.slice(0, 3);
      let sequence: number = parseInt(latestGRN.slice(3), 10);
      sequence++;
      const grnNumber = `${prefix}${sequence.toString().padStart(2, "0")}`;
      return grnNumber;
    } else {
      const prefix: string = "GRN";
      let sequence: number = 1;
      const grnNumber = `${prefix}${sequence.toString().padStart(2, "0")}`;
      return grnNumber;
    }
  }
  async generateTransactionId() {
    const latestTransaction =
      await transactionsRepository.findLatestTransaction();
    if (latestTransaction) {
      const latestTransactionId: string = latestTransaction.transactionId;
      const prefix: string = latestTransactionId.slice(0, 2);
      let sequence: number = parseInt(latestTransactionId.slice(2), 10);
      sequence++;
      const transactionId = `${prefix}${sequence.toString().padStart(5, "0")}`;
      return transactionId;
    } else {
      const prefix: string = "TN";
      let sequence: number = 1;
      const transactionId = `${prefix}${sequence.toString().padStart(5, "0")}`;
      return transactionId;
    }
  }
}

export default new AutogenerateId();
