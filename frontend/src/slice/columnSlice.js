import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isSuccess: null,
  isFailed: null,
  isCreated: null,
  isDeleted: null,
  isUpdated: null,
  isLoading: null,
};

const columnReducer = createSlice({
  name: "column",
  initialState,
  extraReducers: (builder) => {},
});
