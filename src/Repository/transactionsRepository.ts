import transactionsModel, { ITransactions } from "../Models/transactionsModel";
import gernerateGRN from "../AutogenerateId/AutogenerateId";

class TransactionRepository {
  async createTransaction(Data: ITransactions) {
    return await transactionsModel.create(Data);
  }
  async findAllTransactions(filter = {}) {
    return await transactionsModel.find(filter);
  }
  async updateGRNNumber(
    transactionId: string,
    grnNumber: string,
    grnData: any,
    status: string
  ) {
    return await transactionsModel.updateOne(
      { transactionId },
      {
        $set: {
          grnNumber: grnNumber,
          receivedDate: grnData.receivedDate,
          receievedByCustomer: true,
          transactionStatus: status,
        },
      }
    );
  }
  async findLatestGRN() {
    return await transactionsModel
      .findOne({ grnNumber: { $exists: true, $ne: "" } }) // Filters for documents where grnNumber exists and is not an empty string
      .sort({ updatedAt: -1 }) // Sorts in descending order by updatedAt (latest first)
      .exec(); // Executes the query and returns a promise
  }

  async findLatestTransaction() {
    return await transactionsModel.findOne().sort({ createdAt: -1 });
  }
}

export default new TransactionRepository();
