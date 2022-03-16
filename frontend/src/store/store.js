import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import projectReducer from "../slice/projectSlice";

export const store = configureStore({
  reducer: { authReducer, projectReducer },
});
