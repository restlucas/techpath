"use client";

import { ReactNode, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "@/lib/apolloClient";
import { Provider, useSelector } from "react-redux";
import { RootState, store, useAppDispatch } from "@/redux/store";
import { fetchSession } from "@/redux/slices/authSlice";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ApolloClientProvider>{children}</ApolloClientProvider>
      </Provider>
    </SessionProvider>
  );
}

function ApolloClientProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const session = useSelector((state: RootState) => state.auth.session);
  const [client, setClient] = useState(() => createApolloClient(null));

  useEffect(() => {
    dispatch(fetchSession());
  }, [dispatch]);

  useEffect(() => {
    if (session && session.user) {
      const newClient = createApolloClient(session);
      setClient(newClient);
    }
  }, [session]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
