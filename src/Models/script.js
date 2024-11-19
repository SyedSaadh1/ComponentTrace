const newman = require("newman");
const path = require("path");

const runCollection = () => {
  return new Promise((resolve, reject) => {
    newman.run(
      {
        collection: path.resolve("./test2.json"), // Path to your JSON file
        reporters: "cli",
      },
      (err, summary) => {
        if (err) reject(err);
        resolve(summary);
      }
    );
  });
};

// Run 8 instances concurrently
const concurrentRuns = Array.from({ length: 8 }, runCollection);

Promise.all(concurrentRuns)
  .then(() => console.log("All requests completed successfully"))
  .catch((err) => console.error("Error during execution:", err));
