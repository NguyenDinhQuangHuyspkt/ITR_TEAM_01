import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient } from '@apollo/client';
import { HttpLink } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';

const link = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});
const client = new ApolloClient({link, cache: new InMemoryCache()});

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
