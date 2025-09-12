const { gql } = require('apollo-server-express');

const commonTypeDefs = gql`
  scalar Date

  enum Gender {
    MALE
    FEMALE
  }

  type PaginationInfo {
    currentPage: Int!
    totalPages: Int!
    totalItems: Int!
    hasNextPage: Boolean
    hasPrevPage: Boolean
  }

  input PaginationInput {
    page: Int
    limit: Int
  }
`;

module.exports = commonTypeDefs;