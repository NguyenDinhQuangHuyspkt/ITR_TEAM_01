const Physician = require('../../models/physician_model');
const PhysicianService = require('../../services/physician_service');

const physicianResolvers = {
  Query: {
    physicians: async () => {
      return await PhysicianService.findAll();
    },
    physician: async (_, { id }) => {
      return await PhysicianService.findById(id);
    }
  },
  Mutation: {
    createPhysician: async (_, { input }) => {
      return await PhysicianService.create(input);
    },
    updatePhysician: async (_, { id, input }) => {
      return await PhysicianService.update(id, input);
    },
    deletePhysician: async (_, { id }) => {
      return await PhysicianService.delete(id);
    }
  }
};

module.exports = physicianResolvers;
