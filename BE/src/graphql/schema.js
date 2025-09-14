const { makeExecutableSchema } = require('@graphql-tools/schema');
const patientTypeDefs = require('./typeDefs/patient_typedef');
const physicianTypeDefs = require('./typeDefs/physician_typedef');
const commonTypeDefs = require('./typeDefs/common_typedef');
const patientResolvers = require('./resolvers/patient_resolver');
const physicianResolvers = require('./resolvers/physician_resolver');

const typeDefs = [
  commonTypeDefs,
  patientTypeDefs,
  physicianTypeDefs,
];

const resolvers = [
  patientResolvers,
  physicianResolvers,
];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;