import { configureStore } from "@reduxjs/toolkit";
import lessonReducer from "./slices/lessonSlice";
import authReducer from "./slices/authSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    lesson: lessonReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
