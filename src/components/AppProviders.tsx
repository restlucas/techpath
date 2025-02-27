"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </SessionProvider>
  );
}
