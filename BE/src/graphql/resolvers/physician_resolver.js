const Physician = require('../../models/physician_model');
const PhysicianService = require('../../services/physician_service');

const physicianResolvers = {
  Query: {
    physicians: async (_, __, ___, info) => {
      return await PhysicianService.findAll(info);
    },
    physician: async (_, { id }, ___, info) => {
      return await PhysicianService.findById(id, info);
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
