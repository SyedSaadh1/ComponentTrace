import { Request, Response } from "express";
import BatchRepository from "../Repository/BatchRepo";
import Batch from "../Models/BatchModel";
import AutogenerateId from "../AutogenerateId/AutogenerateId";

class BatchController {
  public async createBatch(req: Request, res: Response): Promise<void> {
    try {
      // Generate a unique batch number
      const generatedBatchNo = await AutogenerateId.batchIdGenerate();

      // Create a new batch object with the generated batch number
      const newBatch = new Batch({
        batchNo: generatedBatchNo, // Assign the generated batch number
        componentDetails: req.body.componentDetails,
        createdBy: req.body.createdBy,
        startedDate: req.body.startedDate || new Date(),
        finishedDate: req.body.finishedDate || new Date(),
      });

      // Save the batch in the database
      const savedBatch = await BatchRepository.createBatch(newBatch);
      res.status(201).json({
        message: "Batch created successfully",
        batch: savedBatch,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({
          message: "Error in creating batch: " + error.message,
        });
      } else {
        res.status(500).json({
          message: "An unknown error occurred.",
        });
      }
    }
  }

  public async getAllBatches(req: Request, res: Response): Promise<void> {
    try {
      const batches = await BatchRepository.findAllBatches();
      res.status(200).json(batches);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve batches", error });
    }
  }

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

  public async updateBatch(req: Request, res: Response): Promise<void> {
    try {
      const updatedBatch = await BatchRepository.updateBatch(req.params.id, {
        batchNo: req.body.batchNo,
        componentName: req.body.componentName,
        createdBy: req.body.createdBy,
        finishedDate: req.body.finishedDate,
      });

      if (!updatedBatch) {
        res.status(404).json({ message: "Batch not found" });
        return;
      }

      res.status(200).json({
        message: "Batch updated successfully",
        batch: updatedBatch,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to update batch", error });
    }
  }
}

export default new BatchController();
