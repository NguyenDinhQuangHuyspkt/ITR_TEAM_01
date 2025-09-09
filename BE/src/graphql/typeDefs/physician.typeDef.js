const { gql } = require('apollo-server-express');

const physicianTypeDefs = gql`
  type Physician {
    id: ID!
    email: String!
    title: String!
    phone: String!
    gender: Gender!
    dob: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input CreatePhysicianInput {
    email: String!
    title: String!
    phone: String!
    gender: Gender!
    dob: String!
  }

  input UpdatePhysicianInput {
    email: String
    title: String
    phone: String
    gender: Gender
    dob: String
  }

  type Query {
    physicians: [Physician!]!
    physician(id: ID!): Physician
  }

  type Mutation {
    createPhysician(input: CreatePhysicianInput!): Physician!
    updatePhysician(id: ID!, input: UpdatePhysicianInput!): Physician!
    deletePhysician(id: ID!): Boolean!
  }
`;

module.exports = physicianTypeDefs;