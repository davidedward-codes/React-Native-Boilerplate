import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../authApi";
import dashboardReducer from "../slice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefault) => getDefault().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;