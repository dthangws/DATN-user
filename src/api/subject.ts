import { apiWrapper } from "@/store/apiWrapper";
import { ErrorResponse, UserStatusType } from "@/type/global";
import { PaginationType } from "./user";

const injectedRtkApi = apiWrapper.injectEndpoints({
  endpoints: (build) => ({
    getListSubject: build.query<
      GetListSubjectApiResponse | ErrorResponse,
      GetListSubjectApiArg
    >({
      query: (queryArg) => ({
        url: "/subject",
        params: queryArg,
      }),
      providesTags: ["subject"],
    }),
    getDetailSubject: build.query<
      GetDetailSubjectApiResponse | ErrorResponse,
      GetDetailSubjectApiArg
    >({
      query: (queryArg) => ({
        url: `/subject/${queryArg?.id}`,
        params: queryArg,
      }),
    }),
    postSubject: build.mutation<
      PostSubjectApiResponse | ErrorResponse,
      TypeSubject
    >({
      query: (data) => ({
        url: "/subject",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["subject"],
    }),
    putSubject: build.mutation<
      PostSubjectApiResponse | ErrorResponse,
      PutSubjectApiArg
    >({
      query: (data) => ({
        url: `/subject/${data.id}`,
        body: data.body,
        method: "PUT",
      }),
      invalidatesTags: ["subject"],
    }),
    deleteSubject: build.mutation<
      DeleteSubjectApiResponse | ErrorResponse,
      DeleteSubjectApiArg
    >({
      query: (queryArg) => ({
        url: `/subject/${queryArg?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subject"],
    }),
  }),
});

export type DeleteSubjectApiResponse = {
  data: {
    message: string;
    statusCode: number;
  };
};
export type DeleteSubjectApiArg = {
  id: number;
};

export type PutSubjectApiArg = {
  id: number;
  body: TypeSubject;
};

export type PostSubjectApiResponse = {
  message: string;
  statusCode: number;
  data: TypeSubject;
};

export type GetDetailSubjectApiResponse = {
  data: TypeSubject;
  message: string;
  statusCode: number;
};
export type GetDetailSubjectApiArg = {
  id: number;
};

export type GetListSubjectApiResponse = {
  message?: string;
  statusCode?: number;
  data: {
    data?: TypeSubject[];
    pagination?: PaginationType;
  };
};
export type GetListSubjectApiArg = {
  keyword?: string;
  status?: string;
  page?: number;
  limit?: number;
};

export type TypeSubject = {
  id?: number;
  name?: string;
  description?: string;
  status?: UserStatusType;
  created_at?: string;
  updatedAt?: string;
};

export { injectedRtkApi as SubjectApi };
export const {
  useGetListSubjectQuery,
  useLazyGetListSubjectQuery,
  useGetDetailSubjectQuery,
  useLazyGetDetailSubjectQuery,
  usePostSubjectMutation,
  usePutSubjectMutation,
  useDeleteSubjectMutation,
} = injectedRtkApi;
