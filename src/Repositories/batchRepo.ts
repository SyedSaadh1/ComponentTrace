import BatchModel, { Batch } from "../Models/batchmodels"; // Adjust the path as needed to point to your Batch model

class BatchRepository {
  // Get all batches
  public async findAllBatches(filter = {}): Promise<Batch[]> {
    return BatchModel.find(filter);
  }

  // Create a new batch
  public async createBatch(batch: Batch): Promise<Batch> {
    return BatchModel.create(batch);
  }

  // Find a batch by ID
  public async findBatchById(id: string): Promise<Batch | null> {
    return BatchModel.findById(id);
  }

  // Update a batch by ID
  public async updateBatch(id: string, updatedData: Partial<Batch>): Promise<Batch | null> {
    return BatchModel.findByIdAndUpdate(id, updatedData, { new: true });
  }

  // Delete a batch by ID
  public async deleteBatch(id: string): Promise<Batch | null> {
    return BatchModel.findByIdAndDelete(id);
  }
}

export default new BatchRepository();
