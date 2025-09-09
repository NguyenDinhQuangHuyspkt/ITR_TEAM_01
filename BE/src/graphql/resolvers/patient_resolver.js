const patientService = require('../../services/patient_service');

const patientResolvers = {
  Query: {
    patients: async (_, { pagination }) => {
      return patientService.findAll(pagination);
    },
    patient: async (_, { id }) => {
      return patientService.findById(id);
    },
    patientsByPhysician: async (_, { physicianId }) => {
      return patientService.findByPhysician(physicianId);
    },
    patientBasic: async (_, { id }) => {
      const patient = await patientService.findBasicById(id);
      if (!patient) return null;
      const { _id, email, phone, gender, dob } = patient;
      return { id: _id, email, phone, gender, dob };
    },
    patientsBasic: async () => {
      const patients = await patientService.findAllNoPaginate();
      return patients.map(({ _id, email, phone, gender, dob }) => ({ id: _id, email, phone, gender, dob }));
    }
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