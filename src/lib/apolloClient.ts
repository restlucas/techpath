import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { getSession } from "next-auth/react";

const restLink = new RestLink({
  uri: process.env.NEXT_PUBLIC_TECHPATH_API_URL,
  credentials: "include",
});

const authLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    getSession()
      .then((session) => {
        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            api_key: process.env.NEXT_PUBLIC_TECHPATH_API_KEY || "",
            "x-user-id": session?.user?.id || "",
          },
        }));

        if (forward) {
          forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        } else {
          observer.complete();
        }
      })
      .catch((error) => observer.error(error));
  });
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, restLink]),
});

export default client;
