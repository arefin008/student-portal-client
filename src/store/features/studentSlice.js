import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getStudentsApi,
  createStudentApi,
  updateStudentApi,
  deleteStudentApi,
} from "../../api/studentApi";

export const fetchStudents = createAsyncThunk(
  "students/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return (await getStudentsApi()).data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to load students",
      );
    }
  },
);

export const addStudent = createAsyncThunk(
  "students/add",
  async (data, { rejectWithValue }) => {
    try {
      return (await createStudentApi(data)).data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to add student",
      );
    }
  },
);

export const editStudent = createAsyncThunk(
  "students/edit",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      await updateStudentApi(id, data);
      return { id, data };
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to update student",
      );
    }
  },
);

export const removeStudent = createAsyncThunk(
  "students/remove",
  async (id, { rejectWithValue }) => {
    try {
      await deleteStudentApi(id);
      return id;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to delete student",
      );
    }
  },
);

const studentSlice = createSlice({
  name: "students",
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
      .addCase(fetchStudents.pending, pending)
      .addCase(fetchStudents.rejected, rejected)
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(addStudent.pending, pending)
      .addCase(addStudent.rejected, rejected)
      .addCase(addStudent.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(editStudent.pending, pending)
      .addCase(editStudent.rejected, rejected)
      .addCase(editStudent.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(removeStudent.pending, pending)
      .addCase(removeStudent.rejected, rejected)
      .addCase(removeStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((s) => s.studentId !== action.payload);
      });
  },
});

export default studentSlice.reducer;
