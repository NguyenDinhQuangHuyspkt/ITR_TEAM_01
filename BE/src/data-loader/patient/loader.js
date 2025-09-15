const DataLoader = require("dataloader");
const Patient = require("../../models/patient_model");

async function batchLoadPatients(ids) {
  const stringIds = ids.map(String);
  const docs = await Patient.find({ _id: { $in: stringIds } }).lean();
  const map = new Map(docs.map((d) => [String(d._id), d]));
  return stringIds.map((id) => map.get(id) || null);
}

module.exports = function createPatientLoader() {
  return new DataLoader(batchLoadPatients, { cache: true });
};