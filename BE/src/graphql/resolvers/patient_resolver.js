const { default: createPatientLoader } = require('../../data-loader/patient/loader');
const patientService = require('../../services/patient_service');

const patientResolvers = {
  Query: {
    patients_list: async (_, { pagination, filter }, __, info) => {
      return patientService.findAll(pagination, filter, info);
    },
    patient: async (_, { id },{loaders}, info) => {
      return loaders.patient.load(String(id));
    },
    patientsByPhysician: async (_, { physicianId }, __, info) => {
      return patientService.findByPhysician(physicianId, info);
    },
    physician: async (patient, _, { loaders }) => {
      if (!patient.physician) return null;
      return loaders.physician.load(String(patient.physician));
    }
  },
  Mutation: {
    createPatient: async (_, { input }, {loaders}) => {
      console.log('loaders', loaders);
      const newPatient = await patientService.create(input);
      loaders.patient.clear(String(newPatient._id));

      return newPatient;
    },
    updatePatient: async (_, { id, input }, {loaders}) => {
      const updated = await patientService.update(id, input);
      const res  = loaders.patient.clear(String(id));
      return updated;
    },
    deletePatient: async (_, { id }, {loaders}) => {
      const deleted = await patientService.delete(id);
      loaders.patient.clear(String(id));
      return deleted;
    }
  }
};

module.exports = patientResolvers;