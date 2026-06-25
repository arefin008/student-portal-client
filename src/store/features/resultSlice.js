import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getResultsApi,
  getStudentResultApi,
  createResultApi,
} from "../../api/resultApi";

export const fetchResults = createAsyncThunk(
  "results/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return (await getResultsApi()).data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to load results",
      );
    }
  },
);
export const fetchStudentResult = createAsyncThunk(
  "results/fetchByStudent",
  async (id, { rejectWithValue }) => {
    try {
      return (await getStudentResultApi(id)).data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "No results found");
    }
  },
);
export const addResult = createAsyncThunk(
  "results/add",
  async (data, { rejectWithValue }) => {
    try {
      return (await createResultApi(data)).data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to save result",
      );
    }
  },
);

const resultSlice = createSlice({
  name: "results",
  initialState: { list: [], studentResult: null, loading: false, error: null },
  reducers: {
    clearStudentResult(state) {
      state.studentResult = null;
    },
  },
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
      .addCase(fetchResults.pending, pending)
      .addCase(fetchResults.rejected, rejected)
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchStudentResult.pending, pending)
      .addCase(fetchStudentResult.rejected, rejected)
      .addCase(fetchStudentResult.fulfilled, (state, action) => {
        state.loading = false;
        state.studentResult = action.payload;
      })
      .addCase(addResult.pending, pending)
      .addCase(addResult.rejected, rejected)
      .addCase(addResult.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { clearStudentResult } = resultSlice.actions;
export default resultSlice.reducer;
