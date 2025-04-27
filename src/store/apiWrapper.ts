import axios from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { BaseQueryApi } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { AxiosError, AxiosRequestConfig } from "axios";
import type { RootState } from "./";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      body?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    BaseQueryApi,
    unknown
  > =>
  async (
    { url, method, body, params, headers },
    { getState, signal, dispatch }
  ) => {
    try {
      const store = getState() as RootState;

      const getAuthHeader = () => {
        return {
          Authorization: `Bearer ${store?.auth?.accessToken}`,
        };
      };

      const result = await axios({
        url: url.startsWith("http") ? url : baseUrl + url,
        method: method ?? "GET",
        data: body,
        timeout: typeof window === "undefined" ? 30000 : 600000,
        params,
        ...(typeof window === "undefined"
          ? {
              validateStatus: () => {
                return true;
              },
            }
          : {}),
        signal,
        headers: {
          ...getAuthHeader(),
          ...headers,
        },
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      if (err.response?.status === 401 && localStorage.getItem("accessToken")) {
        dispatch({ type: "auth/logout" });
        window.location.href = "/login";
        localStorage.removeItem("accessToken");
      }

      return {
        error: {
          status: err.response?.status ?? null,
          data: err.response?.data || err.message,
        },
      };
    }
  };
export const apiWrapper = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl:
      process.env.REACT_APP_BASE_API_URL || "http://localhost:8000/api/v1",
  }),

  tagTypes: [
    "user",
    "university",
    "subject",
    "document",
    "transaction",
    "category",
    "vnpay",
  ],
  endpoints: () => ({}),
});
