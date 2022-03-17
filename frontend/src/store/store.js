import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import projectReducer from "../slice/projectSlice";
import labelReducer from "../slice/labelSlice";

export const store = configureStore({
  reducer: { authReducer, projectReducer, labelReducer },
});
