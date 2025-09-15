const { gql } = require('apollo-server-express');

const patientQuery = gql`
  type Query {
    patients_list(pagination: PaginationInput, filter: PatientFilterSearch): PaginatedPatients!
    patient(id: ID!): Patient
    patientsByPhysician(physicianId: ID!): [Patient!]!
  }
`;

module.exports = patientQuery;


