import { apiWrapper } from "@/store/apiWrapper";
import { ErrorResponse, LevelStatusType, UserStatusType } from "@/type/global";

const injectedRtkApi = apiWrapper.injectEndpoints({
  endpoints: (build) => ({
    getListUser: build.query<
      GetListUserApiResponse | ErrorResponse,
      GetListUserApiArg
    >({
      query: (queryArg) => ({
        url: "/user",
        params: queryArg,
      }),
      providesTags: ["user"],
    }),
    getDetailUser: build.query<
      GetDetailUserApiResponse | ErrorResponse,
      GetDetailUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/${queryArg?.id}`,
        params: queryArg,
      }),
    }),
    postUser: build.mutation<PostUserApiResponse | ErrorResponse, TypeUser>({
      query: (data) => ({
        url: "/user",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
    patchUser: build.mutation<
      PostUserApiResponse | ErrorResponse,
      PatchUserApiArg
    >({
      query: (data) => ({
        url: `/user/avatar`,
        body: data.body,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),
    putUser: build.mutation<PostUserApiResponse | ErrorResponse, PutUserApiArg>(
      {
        query: (data) => ({
          url: `/user/${data.id}`,
          body: data.body,
          method: "PUT",
        }),
        invalidatesTags: ["user"],
      }
    ),
    deleteUser: build.mutation<
      DeleteUserApiResponse | ErrorResponse,
      DeleteUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/${queryArg?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export type DeleteUserApiResponse = {
  data: {
    message: string;
    statusCode: number;
  };
};
export type DeleteUserApiArg = {
  id: number;
};

export type PutUserApiArg = {
  id: number;
  body: TypeUser;
};

export type PatchUserApiArg = {
  body: any;
};

export type PostUserApiResponse = {
  message: string;
  statusCode: number;
  data: TypeUser;
};

export type GetDetailUserApiResponse = {
  data: TypeUser;
  message: string;
  statusCode: number;
};
export type GetDetailUserApiArg = {
  id: number;
};

export type GetListUserApiResponse = {
  message?: string;
  statusCode?: number;
  data: {
    data?: TypeUser[];
    pagination?: PaginationType;
  };
};
export type GetListUserApiArg = {
  keyword?: string;
  status?: number;
  userGroupId?: number;
  page?: number;
  limit?: number;
};

export type TypeUser = {
  id?: number;
  username?: string;
  avatar?: string;
  email?: string;
  password?: string;
  full_name?: string;
  phone?: string;
  balance?: number;
  referral_code?: string;
  status?: UserStatusType;
  level?: LevelStatusType;
  file?: any;
  created_at?: string;
  updatedAt?: string;
};

export type PaginationType = {
  totalItems: number;
  page: number;
  limit: number;
  totalPages: number;
};

export { injectedRtkApi as UserApi };
export const {
  useGetListUserQuery,
  useLazyGetListUserQuery,
  useGetDetailUserQuery,
  useLazyGetDetailUserQuery,
  usePostUserMutation,
  usePatchUserMutation,
  usePutUserMutation,
  useDeleteUserMutation,
} = injectedRtkApi;
