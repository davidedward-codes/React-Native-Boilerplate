import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import * as Keychain from "react-native-keychain";

const BASE_URL = "https://example.com/api";

// Timeout wrapper
const fetchWithTimeout = async (args: RequestInfo, options: RequestInit) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(args, { ...options, signal: controller.signal });
    return response;
  } finally {
    clearTimeout(id);
  }
};

// Custom baseQuery with token + timeout + refresh logic
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  timeout: 5000,
  prepareHeaders: async (headers) => {
    const creds = await Keychain.getGenericPassword();
    if (creds) {
      headers.set("X-Auth", creds.password);
    }
    return headers;
  },
});

const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs, unknown, unknown> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if ((result as any).error?.status === 401) {
    // try refresh token
    const refresh = await baseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    if ((refresh as any).data) {
      const newToken = (refresh as any).data.token;
      // store in keychain
      await Keychain.setGenericPassword("auth", newToken);
      // retry original query with new token
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    signIn: builder.mutation<{ token: string }, { email: string; password: string }>({
      query: (body) => ({
        url: "/auth/signin",
        method: "POST",
        body,
      }),
    }),

    signUp: builder.mutation<{ token: string }, { email: string; password: string }>({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
    }),

    refreshToken: builder.mutation<{ token: string }, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
      
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useRefreshTokenMutation } = authApi;
