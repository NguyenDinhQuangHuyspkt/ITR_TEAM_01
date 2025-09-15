const { gql } = require('apollo-server-express');

const physicianType = gql`
  type Physician {
    id: ID
    email: String
    title: String
    phone: String
    gender: Gender
    dob: String
    createdAt: Date
    updatedAt: Date
  }
`;

module.exports = physicianType;


