import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  image: string;
  totalXp: number;
  streak: number;
  createdAt: string;
  following: string[];
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    addFollowing: (state, action: PayloadAction<string>) => {
      if (state.user) {
        if (!state.user.following.includes(action.payload)) {
          state.user.following.push(action.payload);
        }
      }
    },
    removeFollowing: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.following = state.user.following.filter(
          (id) => id !== action.payload,
        );
      }
    },
    setFollowing: (state, action: PayloadAction<string[]>) => {
      if (state.user) {
        state.user.following = action.payload;
      }
    },
  },
});

export const {
  setUser,
  setLoading,
  setError,
  addFollowing,
  removeFollowing,
  setFollowing,
} = userSlice.actions;

export default userSlice.reducer;
