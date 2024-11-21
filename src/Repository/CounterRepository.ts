import { Mutex } from "async-mutex";
import SequenceCounter from "../Models/SequenceCounter";

class CounterRepo {
  private mutex: Mutex;

  constructor() {
    this.mutex = new Mutex(); // Initialize the mutex
  }

  async getSequence() {
    // Acquire the mutex lock
    // const release = await this.mutex.acquire();

    // try {
    const updatedCounter = await SequenceCounter.findOneAndUpdate(
      { poId: "PO-000" },
      { $inc: { sequence: 1 } },
      { returnDocument: "after", upsert: true }
    );

    return updatedCounter;
    //}// finally {
    //   // Release the lock
    //   release();
    // }
  }
}

export default new CounterRepo();
