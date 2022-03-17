import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/api";

export const getLabel = createAsyncThunk(
  "label/getLabel",
  async (projectId, thunkAPI) => {
    try {
      const response = await API_URL.get(`/api/labels/${projectId}`);
      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createLabel = createAsyncThunk(
  "label/createLabel",
  async (label, thunkAPI) => {
    try {
      const response = await API_URL.post("/api/labels", label);
      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteLabel = createAsyncThunk(
  "label/deleteLabel",
  async (labelId, thunkAPI) => {
    try {
      await API_URL.delete(`/api/labels/${labelId}`);
      return labelId;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  isSuccess: null,
  isFailed: null,
  isCreated: null,
  isDeleted: null,
  isLoading: null,
  labels: [],
};

const labelReducer = createSlice({
  name: "label",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getLabel.pending, (state, action) => {
        state.isSuccess = false;
        state.isFailed = false;
        state.isCreated = false;
        state.isDeleted = false;
        state.isLoading = true;
        state.labels = [];
      })
      .addCase(getLabel.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isFailed = false;
        state.isCreated = false;
        state.isDeleted = false;
        state.isLoading = false;
        state.labels = action.payload;
      })
      .addCase(getLabel.rejected, (state, action) => {
        state.isSuccess = false;
        state.isFailed = true;
        state.isCreated = false;
        state.isDeleted = false;
        state.isLoading = false;
      })
      .addCase(createLabel.pending, (state, action) => {
        state.isSuccess = false;
        state.isFailed = false;
        state.isCreated = false;
        state.isDeleted = false;
        state.isLoading = true;
      })
      .addCase(createLabel.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isFailed = false;
        state.isCreated = true;
        state.isDeleted = false;
        state.isLoading = false;
        state.labels.unshift(action.payload);
      })
      .addCase(createLabel.rejected, (state, action) => {
        state.isSuccess = false;
        state.isFailed = true;
        state.isCreated = false;
        state.isDeleted = false;
        state.isLoading = false;
      })

      .addCase(deleteLabel.pending, (state, action) => {
        state.isSuccess = false;
        state.isFailed = false;
        state.isCreated = false;
        state.isDeleted = false;
        state.isLoading = true;
      })
      .addCase(deleteLabel.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isFailed = false;
        state.isCreated = false;
        state.isDeleted = true;
        state.isLoading = false;
        state.labels = state.labels.filter(
          (label) => label._id !== action.payload
        );
      })
      .addCase(deleteLabel.rejected, (state, action) => {
        state.isSuccess = false;
        state.isFailed = true;
        state.isCreated = false;
        state.isDeleted = false;
        state.isLoading = false;
      });
  },
});

export default labelReducer.reducer;
