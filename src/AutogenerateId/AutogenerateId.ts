import CMRepo from "../Repository/ComponentMasterRepository";
import PORepo from "../Repository/PurchaseOrderRepository";
import CLRepo from "../Repository/ComponentListRepository";
import transactionsRepository from "../Repository/TransactionsRepository";
import CounterRepo from "../Repository/CounterRepository";
import { Mutex } from "async-mutex";
class AutogenerateId {
  private mutex: Mutex;
  constructor() {
    this.mutex = new Mutex();
  }
  async CMIdGenerate() {
    const release = await this.mutex.acquire();
    try {
      const lastInsertedCMId = await CMRepo.getLastInsertedId();
      console.log("latest Record from DB found : " + lastInsertedCMId);
      if (lastInsertedCMId) {
        const id = lastInsertedCMId.componentMasterId;
        const prefix: string = id.slice(0, 3);
        // const result = await CounterRepo.getSequence();
        // let sequence = result.sequence;
        let sequence: number = parseInt(id.slice(3));
        sequence++;
        console.log(sequence + " In AutogenerateId " + prefix);
        console.log("Gnenerated ID : " + prefix + sequence);
        return prefix + sequence.toString().padStart(2, "0");
      } else {
        // let prefix = "CM-";
        // const result = await CounterRepo.getSequence();
        // let sequence = result.sequence;
        // const prefix: string = "CM-0";
        // const sequence: number = 1;
        // console.log(prefix + sequence + " first ID");
        // return prefix + sequence.toString().padStart(2, "0");
        return "CM-01";
      }
    } catch (error) {
      throw new Error("Error while generating ID :" + error);
    } finally {
      release();
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
