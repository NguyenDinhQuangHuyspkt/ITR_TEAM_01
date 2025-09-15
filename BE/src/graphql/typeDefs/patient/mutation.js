const { gql } = require('apollo-server-express');

const patientMutation = gql`
  type Mutation {
    createPatient(input: CreatePatientInput!): Patient!
    updatePatient(id: ID!, input: UpdatePatientInput!): Patient!
    deletePatient(id: ID!): Boolean!
  }
`;

module.exports = patientMutation;


