const { gql } = require('apollo-server-express');

const physicianInput = gql`
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
`;

module.exports = physicianInput;


