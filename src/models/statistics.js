const mongoose = require("mongoose");

const statisticsSchema = new mongoose.Schema({
  statistics_id: { type: Number },
  statements_count: { type: Number },
  actors_count: { type: Number },
  activities_count: { type: Number },
  storageSize: { type: Number },
  avgStatementSize: { type: Number }
},{collection:"statistics"});

module.exports = mongoose.model("statistics", statisticsSchema);
// "statistics_id": 1,
//   "statements_count": 0,
//   "actors_count": 0,
//   "activities_count": 0

