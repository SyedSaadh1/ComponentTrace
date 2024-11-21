import mongoose from "mongoose";
export interface ICounter {
  sequence: number;
  poId: string;
}

class Counter {
  private sequence: mongoose.Schema<ICounter>;
  constructor() {
    this.sequence = new mongoose.Schema({
      sequence: {
        type: Number,
        required: true,
      },
      poId: { type: String, required: true },
    });
  }
  getModel() {
    mongoose.pluralize(null);
    return mongoose.model<ICounter>("SequenceCounter", this.sequence);
  }
}

export default new Counter().getModel();
