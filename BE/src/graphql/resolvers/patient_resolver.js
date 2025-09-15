const patientService = require('../../services/patient_service');

const patientResolvers = {
  Query: {
    patients_list: async (_, { pagination, filter }, __, info) => {
      return patientService.findAll(pagination, filter, info);
    },
    patient: async (_, { id }, __, info) => {
      return patientService.findById(id, info);
    },
    patientsByPhysician: async (_, { physicianId }, __, info) => {
      return patientService.findByPhysician(physicianId, info);
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