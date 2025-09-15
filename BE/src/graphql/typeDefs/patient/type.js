const { gql } = require('apollo-server-express');

const patientType = gql`
  type Address {
    address: String!
    city: String!
    state: String!
    country: String!
  }

  type Patient {
    id: ID
    email: String
    phone: String
    gender: Gender
    dob: String
    physician: Physician
    addressInfo: Address
    createdAt: Date
    updatedAt: Date
  }

  type PaginatedPatients {
    patients: [Patient!]!
    pagination: PaginationInfo!
  }
`;

module.exports = patientType;


