import SequenceCounter from "../Models/SequenceCounter";

class CounterRepo {
  async getSequence() {
    return await SequenceCounter.findOneAndUpdate(
      {
        poId: "PO-000",
      },
      {
        $inc: {
          sequence: 1,
        },
      },
      { returnDocument: "after", upsert: true }
    );
  }
}

export default new CounterRepo();
