const { makeExecutableSchema } = require('@graphql-tools/schema');
const patientTypeDefs = require('./typeDefs/patient.typeDef');
const physicianTypeDefs = require('./typeDefs/physician.typeDef');
const commonTypeDefs = require('./typeDefs/common.typeDef');
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