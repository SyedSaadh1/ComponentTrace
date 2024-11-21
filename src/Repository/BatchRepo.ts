import BatchModel, { Batch } from "../Models/Batchmodels"; // Adjust the path as needed to point to your Batch model

class BatchRepository {
  public async findAllBatches(filter = {}): Promise<Batch[]> {
    return BatchModel.find(filter);
  }

  public async createBatch(batch: Batch): Promise<Batch> {
    return BatchModel.create(batch);
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
}

export default new BatchRepository();
