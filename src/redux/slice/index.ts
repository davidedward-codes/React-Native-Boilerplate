import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "https://example.com/api";

// helper to fetch with timeout
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs = 5000
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timeout);
  }
}

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetch",
  async (_, { rejectWithValue }) => {
   
    // 1. request dashboard
    let res = await fetchWithTimeout(`${BASE_URL}/dashboard`, {
      method: "GET",
      headers: { "X-Auth": 'token' },
    });

    // 3. if 401, try refresh
    if (res.status === 401) {
      const refreshRes = await fetchWithTimeout(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "X-Auth": 'token' },
      });

      if (!refreshRes.ok) {
        return rejectWithValue("Session expired, please log in again");
      }

      const refreshData = await refreshRes.json();
      const newToken = refreshData.token;

    
      // retry dashboard with new token
      res = await fetchWithTimeout(`${BASE_URL}/dashboard`, {
        method: "GET",
        headers: { "X-Auth": newToken },
      });

      if (!res.ok) {
        return rejectWithValue("Failed to fetch dashboard after refresh");
      }
    }

    if (!res.ok) {
      return rejectWithValue("Failed to fetch dashboard");
    }

    return await res.json();
  }
);

type DashboardState = {
  data: any;
  loading: boolean;
  error: string | null;
};

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? action.error.message ?? "Error";
      });
  },
});

export default dashboardSlice.reducer;
