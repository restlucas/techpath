import { SessionProps } from "@/lib/apolloClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";

interface AuthState {
  session: SessionProps | null;
}

const initialState: AuthState = {
  session: null,
};

export const fetchSession = createAsyncThunk("auth/fetchSession", async () => {
  const session = await getSession();
  return session as SessionProps | null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSession.fulfilled, (state, action) => {
      state.session = action.payload;
    });
  },
});

export default authSlice.reducer;
