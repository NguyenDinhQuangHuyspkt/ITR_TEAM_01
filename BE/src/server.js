const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const connectDB = require('./config/database');
const schema = require('./graphql/schema');
require('dotenv').config();
const seedPhysicians = require('./seed/physician_seed');
const createLoaders = require('./data-loader/context');

const PORT = process.env.PORT || 4000;

async function startServer() {
  await connectDB();

  await seedPhysicians();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req }) => {
        return {
        req,
        loaders: createLoaders(), 
      };
    },
    formatError: (err) => ({ // Format lỗi cho đẹp
      message: err.message,
    })
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();