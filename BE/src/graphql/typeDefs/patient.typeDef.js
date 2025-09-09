const { gql } = require('apollo-server-express');

const patientTypeDefs = gql`
  type Address {
    address: String!
    city: String!
    state: String!
    country: String!
  }

  type Patient {
    id: ID!
    email: String!
    phone: String!
    gender: Gender!
    dob: String!
    physician: Physician!
    addressInfo: Address!
    createdAt: Date!
    updatedAt: Date!
  }

  # Lấy thông tin cơ bản của patient -> hiển thị table giao diện default
  type PatientBasic {
    id: ID!
    email: String!
    phone: String!
    gender: Gender!
    dob: String!
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

  type Query {
    patients(pagination: PaginationInput): PaginatedPatients!
    patient(id: ID!): Patient
    patientsByPhysician(physicianId: ID!): [Patient!]!
    # Query chỉ lấy các trường cơ bản
    patientBasic(id: ID!): PatientBasic
    patientsBasic: [PatientBasic!]!
  }

  type Mutation {
    createPatient(input: CreatePatientInput!): Patient!
    updatePatient(id: ID!, input: UpdatePatientInput!): Patient!
    deletePatient(id: ID!): Boolean!
  }
`;

module.exports = patientTypeDefs;