const DataLoader = require("dataloader");
const Physician = require("../../models/physician_model");

async function batchLoadPhysicians(ids) {
  const stringIds = ids.map(String);
  const docs = await Physician.find({ _id: { $in: stringIds } }).lean();
  const map = new Map(docs.map((d) => [String(d._id), d]));
  return stringIds.map((id) => map.get(id) || null);
}

module.exports = function createPhysicianLoader() {
  return new DataLoader(batchLoadPhysicians, { cache: true });
};
