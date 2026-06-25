import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardStatsApi } from "../../api/dashboardApi";

export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      return (await getDashboardStatsApi()).data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to load stats",
      );
    }
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: { stats: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
