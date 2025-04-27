import { apiWrapper } from "@/store/apiWrapper";
import { TypeUser } from "./user";

const injectedRtkApi = apiWrapper.injectEndpoints({
  endpoints: (build) => ({
    postLogin: build.mutation<LoginApiResponse, LoginApiArg>({
      query: (queryArg) => ({
        url: "/auth/login",
        method: "POST",
        body: queryArg,
      }),
    }),
    postRegister: build.mutation<LoginApiResponse, RegisterApiArg>({
      query: (queryArg) => ({
        url: "/auth/register",
        method: "POST",
        body: queryArg,
      }),
    }),
    postForgotPassword: build.mutation({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    postResetPassword: build.mutation({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
    getMe: build.query<GetMeApiResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});

export type GetMeApiResponse = {
  data: { user?: TypeUser };
};

export type LoginApiResponse = {
  data: { accessToken?: string | null; permission?: string[]; user?: TypeUser };
};
export type RegisterApiArg = {
  email: string;
  password: string;
  full_name: string;
  username: string;
  phone: string;
  confirmPassword?: string;
};
export type RegisterApiResponse = {
  data: { token?: string | null };
};
export type LoginApiArg = {
  email: string;
  password: string;
};

export { injectedRtkApi as AuthApi };
export const {
  usePostLoginMutation,
  usePostRegisterMutation,
  usePostForgotPasswordMutation,
  usePostResetPasswordMutation,
  useGetMeQuery,
} = injectedRtkApi;
