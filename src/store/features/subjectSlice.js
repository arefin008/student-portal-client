import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSubjectsApi,
  createSubjectApi,
  updateSubjectApi,
  deleteSubjectApi,
} from "../../api/subjectApi";

export const fetchSubjects = createAsyncThunk(
  "subjects/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return (await getSubjectsApi()).data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to load subjects",
      );
    }
  },
);
export const addSubject = createAsyncThunk(
  "subjects/add",
  async (data, { rejectWithValue }) => {
    try {
      return (await createSubjectApi(data)).data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to add subject",
      );
    }
  },
);
export const editSubject = createAsyncThunk(
  "subjects/edit",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      await updateSubjectApi(id, data);
      return { id, data };
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to update subject",
      );
    }
  },
);
export const removeSubject = createAsyncThunk(
  "subjects/remove",
  async (id, { rejectWithValue }) => {
    try {
      await deleteSubjectApi(id);
      return id;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to delete subject",
      );
    }
  },
);

const subjectSlice = createSlice({
  name: "subjects",
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
      .addCase(fetchSubjects.pending, pending)
      .addCase(fetchSubjects.rejected, rejected)
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(addSubject.pending, pending)
      .addCase(addSubject.rejected, rejected)
      .addCase(addSubject.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editSubject.pending, pending)
      .addCase(editSubject.rejected, rejected)
      .addCase(editSubject.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeSubject.pending, pending)
      .addCase(removeSubject.rejected, rejected)
      .addCase(removeSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((s) => s.subjectId !== action.payload);
      });
  },
});

export default subjectSlice.reducer;
