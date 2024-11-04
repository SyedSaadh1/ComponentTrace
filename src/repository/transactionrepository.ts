import transactionsModel, { ITransactions } from "../models/transactionmodel";

class TransactionRepository {
  findAlltransactions(filter = {}) {
    return transactionsModel.find(filter);
  }
  createtransaction(order: ITransactions) {
    return transactionsModel.create(order);
  }
}

export default new TransactionRepository();
