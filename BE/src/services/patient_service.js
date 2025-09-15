const Patient = require('../models/patient_model');
const { PAGINATION } = require('../config/constant');
const validatePatientInput = require('../middleware/validate_patient');
const physician = require('../models/physician_model');
const { buildProjectionAndPopulate } = require('../utils/graphql_projection');
class PatientService {
  async findAll(paginationInput = {}, filter = {}, info) {
    const page = paginationInput.page || PAGINATION.DEFAULT_PAGE;
    const limit = Math.min(
      paginationInput.limit || PAGINATION.DEFAULT_LIMIT,
      PAGINATION.MAX_LIMIT
    );
    const skip = (page - 1) * limit;

    //Query like search email + chỉ trả về patient còn đang active
    const query = { 'patient_status.isActive': true };
    if (filter && filter.email) {
      query.email = { $regex: filter.email, $options: 'i' };
    }

    const { projection, populateSelects } = buildProjectionAndPopulate(info, {
      rootFieldName: 'patients',
      fieldWhitelist: ['id', 'email', 'phone', 'gender', 'dob', 'physician', 'addressInfo'],
      nestedPopulate: {
        physician: ['id', 'email', 'title', 'phone', 'gender', 'dob']
      }
    });

    let queryBuilder = Patient.find(query);

    if (populateSelects.physician) {
      queryBuilder = queryBuilder.populate({
        path: 'physician',
        model: physician,
        select: populateSelects.physician,
      });
    }

    if (projection) {
      queryBuilder = queryBuilder.select(projection);
    }

    const patients = await queryBuilder
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalItems = await Patient.countDocuments(query);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      patients,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  }

  async findAllNoPaginate() {
    return Patient.find(
      {
        'patient_status.isActive': true
      },
      'email phone gender dob'
    );
  }

  async findById(id, info) {
    const { projection, populateSelects } = buildProjectionAndPopulate(info, {
      fieldWhitelist: ['id', 'email', 'phone', 'gender', 'dob', 'physician', 'addressInfo'],
      nestedPopulate: {
        physician: ['id', 'email', 'title', 'phone', 'gender', 'dob']
      }
    });

    let queryBuilder = Patient.findById(
      {
        _id: id,
        'patient_status.isActive': true
      }
    );

    if (populateSelects.physician) {
      queryBuilder = queryBuilder.populate({
        path: 'physician',
        model: physician,
        select: populateSelects.physician,
      });
    }

    if (projection) {
      queryBuilder = queryBuilder.select(projection);
    }

    return queryBuilder;
  }

  async findByPhysician(physicianId, info) {
    const { projection, populateSelects } = buildProjectionAndPopulate(info, {
      fieldWhitelist: ['id', 'email', 'phone', 'gender', 'dob', 'physician', 'addressInfo'],
      nestedPopulate: {
        physician: ['id', 'email', 'title', 'phone', 'gender', 'dob']
      }
    });

    let queryBuilder = Patient.find(
      {
        physician: physicianId,
        'patient_status.isActive': true
      }
    );

    if (populateSelects.physician) {
      queryBuilder = queryBuilder.populate({ path: 'physician', model: physician, select: populateSelects.physician });
    }

    if (projection) {
      queryBuilder = queryBuilder.select(projection);
    }

    return queryBuilder;
  }

  async create(data) {
    await validatePatientInput(data);

    const patient = new Patient({
      ...data,
      physician: data.physicianId,
      patient_status: { isActive: true }
    });

    const res = await patient.save();
    return patient.populate('physician');
  }

  async update(id, data) {
    await validatePatientInput(data);

    const updateData = { ...data };
    if (data.physicianId) {
      updateData.physician = data.physicianId;
      delete updateData.physicianId;
    }

    return Patient.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('physician');
  }

  async delete(id) {
    const updated = await Patient.findByIdAndUpdate(
      id,
      { $set: { 'patient_status.isActive': false } },
      { new: true }
    );
    return !!updated;
  }
}

module.exports = new PatientService();