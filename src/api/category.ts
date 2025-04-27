import { apiWrapper } from "@/store/apiWrapper";
import { ErrorResponse, UserStatusType } from "@/type/global";
import { PaginationType } from "./user";

const injectedRtkApi = apiWrapper.injectEndpoints({
  endpoints: (build) => ({
    getListCategory: build.query<
      GetListCategoryApiResponse | ErrorResponse,
      GetListCategoryApiArg
    >({
      query: (queryArg) => ({
        url: "/category",
        params: queryArg,
      }),
      providesTags: ["category"],
    }),
    getDetailCategory: build.query<
      GetDetailCategoryApiResponse | ErrorResponse,
      GetDetailCategoryApiArg
    >({
      query: (queryArg) => ({
        url: `/category/${queryArg?.id}`,
        params: queryArg,
      }),
    }),
    postCategory: build.mutation<
      PostCategoryApiResponse | ErrorResponse,
      TypeCategory
    >({
      query: (data) => ({
        url: "/category",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["category"],
    }),
    putCategory: build.mutation<
      PostCategoryApiResponse | ErrorResponse,
      PutCategoryApiArg
    >({
      query: (data) => ({
        url: `/category/${data.id}`,
        body: data.body,
        method: "PUT",
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: build.mutation<
      DeleteCategoryApiResponse | ErrorResponse,
      DeleteCategoryApiArg
    >({
      query: (queryArg) => ({
        url: `/category/${queryArg?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export type DeleteCategoryApiResponse = {
  data: {
    message: string;
    statusCode: number;
  };
};
export type DeleteCategoryApiArg = {
  id: number;
};

export type PutCategoryApiArg = {
  id: number;
  body: TypeCategory;
};

export type PostCategoryApiResponse = {
  message: string;
  statusCode: number;
  data: TypeCategory;
};

export type GetDetailCategoryApiResponse = {
  data: TypeCategory;
  message: string;
  statusCode: number;
};
export type GetDetailCategoryApiArg = {
  id: number;
};

export type GetListCategoryApiResponse = {
  message?: string;
  statusCode?: number;
  data: {
    data?: TypeCategory[];
    pagination?: PaginationType;
  };
};
export type GetListCategoryApiArg = {
  keyword?: string;
  status?: string;
  page?: number;
  limit?: number;
};

export type TypeCategory = {
  id?: number;
  name?: string;
  description?: string;
  status?: UserStatusType;
  created_at?: string;
  updatedAt?: string;
};

export { injectedRtkApi as CategoryApi };
export const {
  useGetListCategoryQuery,
  useLazyGetListCategoryQuery,
  useGetDetailCategoryQuery,
  useLazyGetDetailCategoryQuery,
  usePostCategoryMutation,
  usePutCategoryMutation,
  useDeleteCategoryMutation,
} = injectedRtkApi;
