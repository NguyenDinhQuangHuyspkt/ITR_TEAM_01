const createPatientLoader = require('./patient/loader');
const createPhysicianLoader = require('./physician/loader');

function createLoaders() {
  return {
    patient: createPatientLoader(),
    physician: createPhysicianLoader(),
  };
}

module.exports = createLoaders;
