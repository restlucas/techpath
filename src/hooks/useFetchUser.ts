// src/hooks/useFetchUser.ts

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "../redux/slices/userSlice";
import { createApolloClient, SessionProps } from "@/lib/apolloClient";
import { GET_USER } from "@/graphql/queries/user.queries";

const useFetchUser = (session: SessionProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoading(true));
      const client = createApolloClient(session);

      const { data } = await client.query({
        query: GET_USER,
      });

      dispatch(setUser(data.user.data));
      dispatch(setLoading(false));
    };

    if (session) {
      fetchUser();
    }
  }, [session, dispatch]);
};

export default useFetchUser;
