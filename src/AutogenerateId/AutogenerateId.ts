import transactionsRepository from "../Repository/transactionsRepository";
class AutogenerateId {
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
