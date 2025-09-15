const { PAGINATION } = require('../config/constant');
const Physician = require('../models/physician_model');
const { buildProjectionAndPopulate } = require('../utils/graphql_projection');

class PhysicianService {
    async findAll(info) {
        try {
            const { projection } = buildProjectionAndPopulate(info, {
                fieldWhitelist: ['id','email','title','phone','gender','dob']
            });
            const query = Physician.find();
            if (projection) query.select(projection);
            return await query;
        } catch (err) {
            console.error('Error fetching physicians:', err);
            return [];
        }
    }

    async findById(id, info) {
        try {
            const { projection } = buildProjectionAndPopulate(info, {
                fieldWhitelist: ['id','email','title','phone','gender','dob']
            });
            const query = Physician.findById(id);
            if (projection) query.select(projection);
            return await query;
        } catch (err) {
            console.error('Error fetching physician:', err);
            return null;
        }
    }

    async create(input) {
        try {
            const physician = new Physician(input);
            await physician.save();
            return physician;
        } catch(err) {
            console.log('Error when create physician: ', err);
            return null;
        }
    }

    async update(id, input) {
        return Physician.findByIdAndUpdate(id, input, 
            { 
                new: true, 
                runValidators: true 
            }
        );
    }

    async delete(id) {
        try {
            const result = await Physician.findByIdAndDelete(id);
            return !!result;
        } catch(err) {
            console.log('Error when delete physician: ', err);
            return null;
        }
    }
}

module.exports = new PhysicianService();