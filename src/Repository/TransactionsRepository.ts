import transactionsModel, { ITransactions } from "../Models/TransactionsModel";
import gernerateGRN from "../AutogenerateId/AutogenerateId";

class TransactionRepository {
  async createTransaction(Data: ITransactions) {
    try {
      return await transactionsModel.create(Data);
    } catch (error) {
      throw new Error("Error in creating Transaction :" + error);
    }
  }
  async findAllTransactions(filter = {}) {
    try {
      return await transactionsModel.find(filter);
    } catch (error) {
      throw new Error("Error while fetching Transactions : " + error);
    }
  }
  async updateGRNNumber(
    transactionId: string,
    grnNumber: string,
    grnData: any
  ) {
    try {
      return await transactionsModel.updateOne(
        { transactionId },
        {
          $set: {
            grnNumber: grnNumber,
            receivedDate: grnData.receivedDate,
            receievedByCustomer: true,
            transactionStatus: "Completed",
          },
        }
      );
    } catch (error) {
      throw new Error("Error in Creating GRN Number");
    }
  }
  async findLatestGRN() {
    return await transactionsModel
      .findOne({ grnNumber: { $exists: true, $ne: "" } })
      .sort({ updatedAt: -1 });
  }

  async findLatestTransaction() {
    return await transactionsModel.findOne().sort({ createdAt: -1 });
  }
}

export default new TransactionRepository();
