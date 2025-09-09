const Physician = require('../../models/physician_model');

const physicianResolvers = {
  Query: {
    physicians: async () => {
      try {
        return await Physician.find();
      } catch (err) {
        console.error('Error fetching physicians:', err);
        return [];
      }
    },
    physician: async (_, { id }) => {
      try {
        return await Physician.findById(id);
      } catch (err) {
        console.error('Error fetching physician:', err);
        return null;
      }
    }
  },
  Mutation: {
    createPhysician: async (_, { input }) => {
      const physician = new Physician(input);
      await physician.save();
      return physician;
    },
    updatePhysician: async (_, { id, input }) => {
      return Physician.findByIdAndUpdate(id, input, { new: true, runValidators: true });
    },
    deletePhysician: async (_, { id }) => {
      const result = await Physician.findByIdAndDelete(id);
      return !!result;
    }
  }
};

module.exports = physicianResolvers;
