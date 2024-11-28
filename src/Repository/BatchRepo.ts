import BatchModel, { Batch } from "../Models/BatchModel";

class BatchRepository {
  public async findAllBatches(filter = {}): Promise<Batch[]> {
    return BatchModel.find(filter);
  }

  public async createBatch(batch: Partial<Batch>) {
    return BatchModel.insertMany(batch);
  }

  public async findBatchById(id: string): Promise<Batch | null> {
    return BatchModel.findById(id);
  }

  public async updateBatch(
    id: string,
    updatedData: Partial<Batch>
  ): Promise<Batch | null> {
    return BatchModel.findByIdAndUpdate(id, updatedData, { new: true });
  }

  async getLastInsertedId() {
    try {
      const lastInsertedBatch = await BatchModel.findOne().sort({ _id: -1 }).limit(1);
      return lastInsertedBatch || { batchNo: "BN0000" };  
    } catch (error) {
      throw new Error(
        "Error encountered while fetching last inserted ID for batch list: " +
          error
      );
    }
  }
}

export default new BatchRepository();
