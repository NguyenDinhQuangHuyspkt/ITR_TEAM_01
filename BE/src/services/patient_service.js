const Patient = require('../models/patient_model');
const { PAGINATION } = require('../config/constant');
const validatePatientInput = require('../middleware/validate_patient');
// const physician = require('../models/physician_model');
class PatientService {
  async findAll(paginationInput = {}, filter = {}) {
    const page = paginationInput.page || PAGINATION.DEFAULT_PAGE;
    const limit = Math.min(
      paginationInput.limit || PAGINATION.DEFAULT_LIMIT,
      PAGINATION.MAX_LIMIT
    );
    const skip = (page - 1) * limit;

    //Query like search email
    const query = {};
    if (filter && filter.email) {
      query.email = { $regex: filter.email, $options: 'i' };
    }

    const patients = await Patient.find(query)
      .populate({
        path: 'physician',
        model: 'Physician',
        select: "id"
      })
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
    return Patient.find({}, 'email phone gender dob');
  }

  async findById(id) {
    return Patient.findById(id).populate('physician');
  }

  async findByPhysician(physicianId) {
    return Patient.find({ physician: physicianId }).populate('physician');
  }

  async create(data) {
    validatePatientInput(data);
    const patient = new Patient({
      ...data,
      physician: data.physicianId
    });
    await patient.save();
    return patient.populate('physician');
  }

  async update(id, data) {
    validatePatientInput(data);
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
    const result = await Patient.findByIdAndDelete(id);
    return !!result;
  }

  async findBasicById(id) {
    return Patient.findById(id, 'email phone gender dob');
  }
}

module.exports = new PatientService();