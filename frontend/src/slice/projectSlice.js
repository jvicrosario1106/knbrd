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

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId, thunkAPI) => {
    try {
      await API_URL.delete(`/api/projects/${projectId}`, {
        withCredentials: true,
      });
      return projectId;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProjectName = createAsyncThunk(
  "project/updateProjectName",
  async (data, thunkAPI) => {
    try {
      await API_URL.patch("/api/projects/changename", data, {
        withCredentials: true,
      });
      console.log(data);
      return data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Column Thunk

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

export const columnOrder = createAsyncThunk(
  "column/columnOrder",
  async (data, thunkAPI) => {
    const { projectReducer } = thunkAPI.getState();
    console.log(projectReducer.projects[0].columns);
    try {
      await API_URL.patch("/api/columns/columnOrder", {
        project: data.project,
        columns: projectReducer.projects[0].columns,
      });
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  "column/deleteColumn",
  async (columnId, thunkAPI) => {
    try {
      await API_URL.delete(`/api/columns/${columnId}`);
      return columnId;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Task Thunk

export const createTask = createAsyncThunk(
  "project/createTask",
  async (task, thunkAPI) => {
    try {
      const response = await API_URL.post("/api/tasks", task);
      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const taskOrder = createAsyncThunk(
  "project/taskOrder",
  async (data, thunkAPI) => {
    const { projectReducer } = thunkAPI.getState();
    const getTasks = projectReducer.projects[0].columns.filter(
      (column) => column._id === data.column
    );
    try {
      await API_URL.patch("/api/tasks/taskOrder", {
        column: data.column,
        task: getTasks[0].task,
      });
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const taskOrderByColumn = createAsyncThunk(
  "project/taskOrderByColumn",
  async (data, thunkAPI) => {
    const { projectReducer } = thunkAPI.getState();
    const getPreviousTask = projectReducer.projects[0].columns.filter(
      (column) => column._id === data.result.source.droppableId
    );
    const getNewTask = projectReducer.projects[0].columns.filter(
      (column) => column._id === data.result.destination.droppableId
    );

    try {
      await API_URL.patch("/api/tasks/taskOrderByColumn", {
        projectId: data.id,
        sourceColumn: data.result.source.droppableId,
        sourceTasks: getPreviousTask[0].task,
        destinationColumn: data.result.destination.droppableId,
        destinationTask: getNewTask[0].task,
      });
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
    // Column
    reorder: (state, action) => {
      const { destination, draggableId, source } = action.payload;
      const item = Array.from(state.projects[0].columns);
      const [removedItem] = item.splice(source.index, 1);
      item.splice(destination.index, 0, removedItem);
      state.projects[0].columns = item;
    },
    // Order Task Inside Column
    reorderTask: (state, action) => {
      const { destination, draggableId, source } = action.payload;
      const getColumn = state.projects[0].columns.filter(
        (column) => column._id === destination.droppableId
      );

      const item = Array.from(getColumn[0].task);
      const [removedItem] = item.splice(source.index, 1);
      item.splice(destination.index, 0, removedItem);
      state.projects[0].columns = state.projects[0].columns.map((column) =>
        column._id === destination.droppableId
          ? { ...column, task: item }
          : column
      );
    },
    // Order Task By Column
    taskByColumn: (state, action) => {
      const { destination, draggableId, source } = action.payload;
      const columnDestination = state.projects[0].columns.filter(
        (column) => column._id === destination.droppableId
      );
      const columnSource = state.projects[0].columns.filter(
        (column) => column._id === source.droppableId
      );

      //Initialize Array
      const arraySource = Array.from(columnSource[0].task);
      const arrayDestination = Array.from(columnDestination[0].task);

      // Set and Remove Item
      const [removedItem] = arraySource.splice(source.index, 1);
      arrayDestination.splice(destination.index, 0, removedItem);

      state.projects[0].columns = state.projects[0].columns.map((column) =>
        column._id === source.droppableId
          ? { ...column, task: arraySource }
          : column
      );

      state.projects[0].columns = state.projects[0].columns.map((column) =>
        column._id === destination.droppableId
          ? { ...column, task: arrayDestination }
          : column
      );
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

      .addCase(deleteProject.pending, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isLoading = true;
        state.isFailed = false;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = true;
        state.isSuccess = true;
        state.isLoading = false;
        state.isFailed = false;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.isFailed = true;
      })
      .addCase(updateProjectName.pending, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.isFailed = false;
      })
      .addCase(updateProjectName.fulfilled, (state, action) => {
        state.isCreated = false;
        state.isUpdated = true;
        state.isDeleted = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.isFailed = false;
        state.projects[0].name = action.payload.name;
      })
      .addCase(updateProjectName.rejected, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.isFailed = true;
      })
      //Column
      .addCase(addColumn.pending, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isFailed = false;
      })
      .addCase(addColumn.fulfilled, (state, action) => {
        state.isCreated = true;
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
      })
      .addCase(columnOrder.pending, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isFailed = false;
      })
      .addCase(columnOrder.fulfilled, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.isFailed = false;
      })
      .addCase(columnOrder.rejected, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.isFailed = true;
      })
      .addCase(deleteColumn.pending, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isFailed = false;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.isFailed = false;
        state.projects[0].columns = state.projects[0].columns.filter(
          (column) => column._id !== action.payload
        );
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.isFailed = true;
      })
      //Task
      .addCase(createTask.pending, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isFailed = false;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isCreated = true;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.isFailed = false;
        console.log(action.payload);
        const getColumn = state.projects[0].columns.filter(
          (column) => column._id === action.payload[0].column
        );
        const getTasks = getColumn[0].task.unshift(action.payload[0]);

        state.projects[0].columns = state.projects[0].columns.map((column) =>
          column._id === action.payload.column
            ? { ...column, getColumn }
            : column
        );
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.isFailed = true;
      })

      .addCase(taskOrder.pending, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isFailed = false;
      })
      .addCase(taskOrder.fulfilled, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.isFailed = false;
      })
      .addCase(taskOrder.rejected, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.isFailed = true;
      })

      .addCase(taskOrderByColumn.pending, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isFailed = false;
      })
      .addCase(taskOrderByColumn.fulfilled, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.isFailed = false;
      })
      .addCase(taskOrderByColumn.rejected, (state, action) => {
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.isFailed = true;
      });
  },
});

export const { reorder, reorderTask, taskByColumn } = projectReducer.actions;

export default projectReducer.reducer;
