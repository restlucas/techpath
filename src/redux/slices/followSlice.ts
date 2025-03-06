import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FollowState {
  following: string[];
}

const initialState: FollowState = {
  following: [],
};

const followSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addFollowing: (state, action: PayloadAction<string>) => {
      if (!state.following.includes(action.payload)) {
        state.following.push(action.payload);
      }
    },
    removeFollowing: (state, action: PayloadAction<string>) => {
      state.following = state.following.filter((id) => id !== action.payload);
    },
    setFollowing: (state, action: PayloadAction<string[]>) => {
      state.following = action.payload;
    },
  },
});

export const { addFollowing, removeFollowing, setFollowing } =
  followSlice.actions;
export default followSlice.reducer;
