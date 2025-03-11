import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { RestLink } from "apollo-link-rest";

export type SessionProps = {
  user: {
    email: string;
    id: string;
    username: string;
  };
  expires: string;
};

const restLink = new RestLink({
  uri: process.env.NEXT_PUBLIC_TECHPATH_API_URL,
  credentials: "include",
});

export const createApolloClient = (session: SessionProps | null = null) => {
  const authLink = new ApolloLink((operation, forward) => {
    return new Observable((observer) => {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          "api-key": process.env.NEXT_PUBLIC_TECHPATH_API_KEY || "",
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
    });
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink, restLink]),
  });
};
