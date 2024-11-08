import transactionsModel, { ITransactions } from "../Models/transactionsModel";
class TransactionRepository {
  async createTransaction(Data: ITransactions) {
    return transactionsModel.create(Data);
  }
  async findAllTransactions(filter = {}) {
    return transactionsModel.find(filter);
  }
  // async generateGRNNumber(poId, grnData) {
  //   return transactionsModel.updateOne({ poId: poId }, { $set: {} });
  // }
}

export default new TransactionRepository();
