import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credential, thunkAPI) => {
    try {
      const response = await API_URL.post("/api/auth/login", credential, {
        withCredentials: true,
      });

      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  isSuccess: null,
  isFailed: null,
  isLoading: null,
};

const authReducer = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isSuccess = false;
        state.isFailed = false;
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isFailed = false;
        state.isLoading = false;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isSuccess = false;
        state.isFailed = true;
        state.isLoading = false;
      });
  },
});

export default authReducer.reducer;
