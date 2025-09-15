const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./typeDefs');
const patientResolvers = require('./resolvers/patient_resolver');
const physicianResolvers = require('./resolvers/physician_resolver');

const resolvers = [
  patientResolvers,
  physicianResolvers,
];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;