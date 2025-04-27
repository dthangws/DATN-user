import { apiWrapper } from "@/store/apiWrapper";
import { ErrorResponse, UserStatusType } from "@/type/global";
import { PaginationType } from "./user";

const injectedRtkApi = apiWrapper.injectEndpoints({
  endpoints: (build) => ({
    getListUniversity: build.query<
      GetListUniversityApiResponse | ErrorResponse,
      GetListUniversityApiArg
    >({
      query: (queryArg) => ({
        url: "/university",
        params: queryArg,
      }),
      providesTags: ["university"],
    }),
    getDetailUniversity: build.query<
      GetDetailUniversityApiResponse | ErrorResponse,
      GetDetailUniversityApiArg
    >({
      query: (queryArg) => ({
        url: `/university/${queryArg?.id}`,
        params: queryArg,
      }),
    }),
    postUniversity: build.mutation<
      PostUniversityApiResponse | ErrorResponse,
      TypeUniversity
    >({
      query: (data) => ({
        url: "/university",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["university"],
    }),
    putUniversity: build.mutation<
      PostUniversityApiResponse | ErrorResponse,
      PutUniversityApiArg
    >({
      query: (data) => ({
        url: `/university/${data.id}`,
        body: data.body,
        method: "PUT",
      }),
      invalidatesTags: ["university"],
    }),
    deleteUniversity: build.mutation<
      DeleteUniversityApiResponse | ErrorResponse,
      DeleteUniversityApiArg
    >({
      query: (queryArg) => ({
        url: `/university/${queryArg?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["university"],
    }),
  }),
});

export type DeleteUniversityApiResponse = {
  data: {
    message: string;
    statusCode: number;
  };
};
export type DeleteUniversityApiArg = {
  id: number;
};

export type PutUniversityApiArg = {
  id: number;
  body: TypeUniversity;
};

export type PostUniversityApiResponse = {
  message: string;
  statusCode: number;
  data: TypeUniversity;
};

export type GetDetailUniversityApiResponse = {
  data: TypeUniversity;
  message: string;
  statusCode: number;
};
export type GetDetailUniversityApiArg = {
  id: number;
};

export type GetListUniversityApiResponse = {
  message?: string;
  statusCode?: number;
  data: {
    data?: TypeUniversity[];
    pagination?: PaginationType;
  };
};
export type GetListUniversityApiArg = {
  keyword?: string;
  status?: string;
  page?: number;
  limit?: number;
};

export type TypeUniversity = {
  id?: number;
  name?: string;
  description?: string;
  status?: UserStatusType;
  created_at?: string;
  updatedAt?: string;
};

export { injectedRtkApi as UniversityApi };
export const {
  useGetListUniversityQuery,
  useLazyGetListUniversityQuery,
  useGetDetailUniversityQuery,
  useLazyGetDetailUniversityQuery,
  usePostUniversityMutation,
  usePutUniversityMutation,
  useDeleteUniversityMutation,
} = injectedRtkApi;
