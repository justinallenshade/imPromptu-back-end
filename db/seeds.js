const Writing = require("../models/writing");
const WritingSeeds = require("./seeds.json");

Writing.deleteMany({})
  .then(() => {
    return Writing.insertMany(WritingSeeds);
  })
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    process.exit();
  });
