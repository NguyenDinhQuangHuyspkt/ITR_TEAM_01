const commonTypeDefs = require('./common_typedef');

// patient
const patientType = require('./patient/type');
const patientInput = require('./patient/input');
const patientQuery = require('./patient/query');
const patientMutation = require('./patient/mutation');

// physician
const physicianType = require('./physician/type');
const physicianInput = require('./physician/input');
const physicianQuery = require('./physician/query');
const physicianMutation = require('./physician/mutation');

module.exports = [
  commonTypeDefs,
  // patient
  patientType,
  patientInput,
  patientQuery,
  patientMutation,
  // physician
  physicianType,
  physicianInput,
  physicianQuery,
  physicianMutation,
];


