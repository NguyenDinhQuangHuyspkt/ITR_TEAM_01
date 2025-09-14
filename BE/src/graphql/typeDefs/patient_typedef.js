const { gql } = require('apollo-server-express');

const patientTypeDefs = gql`
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

  type Query {
    patients_list(pagination: PaginationInput, filter: PatientFilterSearch): PaginatedPatients!
    patient(id: ID!): Patient
    patientsByPhysician(physicianId: ID!): [Patient!]!
  }

  type Mutation {
    createPatient(input: CreatePatientInput!): Patient!
    updatePatient(id: ID!, input: UpdatePatientInput!): Patient!
    deletePatient(id: ID!): Boolean!
  }
`;

module.exports = patientTypeDefs;