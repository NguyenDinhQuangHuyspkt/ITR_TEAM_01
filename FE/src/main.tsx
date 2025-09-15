import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient } from '@apollo/client';
import { HttpLink } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import { ToastContainer } from 'react-toastify';

const apiUrl = import.meta.env.VITE_API_URL;  

const link = new HttpLink({
  uri: apiUrl,
});
const client = new ApolloClient({link, cache: new InMemoryCache()});

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </ApolloProvider>
)
