const { gql } = require('apollo-server-express');

const patientInput = gql`
  input AddressInput {
    address: String!
    city: String!
    state: String!
    country: String!
  }

  input CreatePatientInput {
    email: String!
    phone: String!
    gender: Gender!
    dob: String!
    physicianId: ID!
    addressInfo: AddressInput!
  }

  input UpdatePatientInput {
    email: String
    phone: String
    gender: Gender
    dob: String
    physicianId: ID
    addressInfo: AddressInput
  }

  # Input cho filter like search email của patient
  input PatientFilterSearch {
    email: String
  }
`;

module.exports = patientInput;


