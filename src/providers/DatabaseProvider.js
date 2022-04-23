import { useMemo, createContext } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const DatabaseContext = createContext({ client: null, loading: true });

export const DatabaseProvider = ({ children }) => {
  let client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
  });

  let value = useMemo(() => ({ client }), [client]);

  return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>;
};
