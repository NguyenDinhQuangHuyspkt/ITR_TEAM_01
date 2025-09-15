const { gql } = require('apollo-server-express');

const physicianMutation = gql`
  type Mutation {
    createPhysician(input: CreatePhysicianInput!): Physician!
    updatePhysician(id: ID!, input: UpdatePhysicianInput!): Physician!
    deletePhysician(id: ID!): Boolean!
  }
`;

module.exports = physicianMutation;


