import { Request, Response } from 'express';
import BatchRepository from '../Repository/batchRepo'; // Adjust the path as needed to point to your Batch repository
import Batch from '../Models/batchmodels'; // Adjust the path as needed to point to your Batch model

class BatchController {
  // Create a new batch
  public async createBatch(req: Request, res: Response): Promise<void> {
    try {
      const newBatch = new Batch({
        batchNo: req.body.batchNo,
        componentDetails: req.body.componentDetails,
        createdBy: req.body.createdBy,
        startedDate: req.body.startedDate || new Date(),
        finishedDate: req.body.finishedDate || new Date()
      });

      const savedBatch = await BatchRepository.createBatch(newBatch);
      res.status(201).json(savedBatch);
    } catch (error) {
      res.status(500).json({ message: "Failed to create batch", error });
    }
  }

  // Get all batches
  public async getAllBatches(req: Request, res: Response): Promise<void> {
    try {
      const batches = await BatchRepository.findAllBatches();
      res.status(200).json(batches);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve batches", error });
    }
  }

  // Get a batch by ID
  public async getBatchById(req: Request, res: Response): Promise<void> {
    try {
      const batch = await BatchRepository.findBatchById(req.params.id);
      if (!batch) {
        res.status(404).json({ message: "Batch not found" });
        return;
      }
      res.status(200).json(batch);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve batch", error });
    }
  }

  // Update a batch by ID
  public async updateBatch(req: Request, res: Response): Promise<void> {
    try {
      const updatedBatch = await BatchRepository.updateBatch(req.params.id, {
        batchNo: req.body.batchNo,
        componentDetails: req.body.componentDetails,
        createdBy: req.body.createdBy,
        startedDate: req.body.startedDate,
        finishedDate: req.body.finishedDate
      });

      if (!updatedBatch) {
        res.status(404).json({ message: "Batch not found" });
        return;
      }

      res.status(200).json(updatedBatch);
    } catch (error) {
      res.status(500).json({ message: "Failed to update batch", error });
    }
  }
}

export default new BatchController();
