const patientService = require('../../services/patient_service');

const patientResolvers = {
  Query: {
    patients_list: async (_, { pagination, filter }) => {
      return patientService.findAll(pagination, filter);
    },
    patient: async (_, { id }) => {
      return patientService.findById(id);
    },
    patientsByPhysician: async (_, { physicianId }) => {
      return patientService.findByPhysician(physicianId);
    },
  },
  Mutation: {
    createPatient: async (_, { input }) => {
      return patientService.create(input);
    },
    updatePatient: async (_, { id, input }) => {
      return patientService.update(id, input);
    },
    deletePatient: async (_, { id }) => {
      return patientService.delete(id);
    }
  }
};

module.exports = patientResolvers;