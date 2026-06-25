import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getClassesApi,
  createClassApi,
  updateClassApi,
  deleteClassApi,
} from "../../api/classApi";

export const fetchClasses = createAsyncThunk(
  "classes/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return (await getClassesApi()).data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to load classes",
      );
    }
  },
);
export const addClass = createAsyncThunk(
  "classes/add",
  async (data, { rejectWithValue }) => {
    try {
      return (await createClassApi(data)).data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to add class",
      );
    }
  },
);
export const editClass = createAsyncThunk(
  "classes/edit",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      await updateClassApi(id, data);
      return { id, data };
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to update class",
      );
    }
  },
);
export const removeClass = createAsyncThunk(
  "classes/remove",
  async (id, { rejectWithValue }) => {
    try {
      await deleteClassApi(id);
      return id;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to delete class",
      );
    }
  },
);

const classSlice = createSlice({
  name: "classes",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    const pending = (state) => {
      state.loading = true;
      state.error = null;
    };
    const rejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };
    builder
      .addCase(fetchClasses.pending, pending)
      .addCase(fetchClasses.rejected, rejected)
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(addClass.pending, pending)
      .addCase(addClass.rejected, rejected)
      .addCase(addClass.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editClass.pending, pending)
      .addCase(editClass.rejected, rejected)
      .addCase(editClass.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeClass.pending, pending)
      .addCase(removeClass.rejected, rejected)
      .addCase(removeClass.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((c) => c.classId !== action.payload);
      });
  },
});

export default classSlice.reducer;
