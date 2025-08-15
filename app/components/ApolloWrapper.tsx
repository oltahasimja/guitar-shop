'use client';

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://graphql-api-brown.vercel.app/api/graphql' }),
  cache: new InMemoryCache(),
});

export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
