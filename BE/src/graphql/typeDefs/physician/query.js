const { gql } = require('apollo-server-express');

const physicianQuery = gql`
  type Query {
    physicians: [Physician!]!
    physician(id: ID!): Physician
  }
`;

module.exports = physicianQuery;


