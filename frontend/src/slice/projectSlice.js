import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/api";

export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async (projects, thunkAPI) => {
    try {
      const response = await API_URL.get("/api/projects", {
        withCredentials: true,
      });

      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (project, thunkAPI) => {
    try {
      const response = await API_URL.post("/api/projects", project, {
        withCredentials: true,
      });

      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProject = createAsyncThunk(
  "projects/getProject",
  async (project, thunkAPI) => {
    try {
      const response = await API_URL.get(`/api/projects/${project}`, {
        withCredentials: true,
      });

      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addColumn = createAsyncThunk(
  "project/addColumn",
  async (column, thunkAPI) => {
    try {
      const response = await API_URL.post("/api/columns", column);
      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  isCreated: null,
  isUpdated: null,
  isDeleted: null,
  isSuccess: null,
  isLoading: null,
  isFailed: null,
  projects: [],
};

const projectReducer = createSlice({
  name: "projects",
  initialState,
  reducers: {
    reorder: (state, action) => {
      const { destination, draggableId, source } = action.payload;
      const item = Array.from(state.projects[0].columns);
      const [removedItem] = item.splice(source.index, 1);
      item.splice(destination.index, 0, removedItem);
      state.projects[0].columns = item;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isLoading = true;
        state.isFailed = false;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.isFailed = false;
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.isFailed = true;
      })
      .addCase(createProject.pending, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isLoading = true;
        state.isFailed = false;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isCreated = true;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.isFailed = false;
        state.projects.unshift(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.isFailed = true;
      })

      .addCase(getProject.pending, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isLoading = true;
        state.isFailed = false;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.isFailed = false;
        state.projects = action.payload;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.isFailed = true;
      })

      .addCase(addColumn.pending, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        // state.isLoading = true;
        state.isFailed = false;
      })
      .addCase(addColumn.fulfilled, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.isFailed = false;
        state.projects.length > 0 &&
          state.projects[0].columns.unshift(action.payload);
      })
      .addCase(addColumn.rejected, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.isFailed = true;
      });
  },
});

export const { reorder } = projectReducer.actions;

export default projectReducer.reducer;
