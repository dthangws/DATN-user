/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiWrapper } from "@/store/apiWrapper";
import { ErrorResponse, UserStatusType } from "@/type/global";
import { PaginationType, TypeUser } from "./user";
import { TypeSubject } from "./subject";
import { TypeUniversity } from "./university";

const injectedRtkApi = apiWrapper.injectEndpoints({
  endpoints: (build) => ({
    getDocumentPreview: build.query({
      query: (queryArg) => ({
        url: `/document/preview/${queryArg?.id}`,
        params: queryArg,
      }),
    }),
    getListDocument: build.query<
      GetListDocumentApiResponse | ErrorResponse,
      GetListDocumentApiArg
    >({
      query: (queryArg) => ({
        url: "/document",
        params: queryArg,
      }),
      providesTags: ["document"],
    }),
    getPurchasedDocument: build.query<
      GetListDocumentApiResponse | ErrorResponse,
      GetListDocumentApiArg
    >({
      query: (queryArg) => ({
        url: "/documents/purchased",
        params: queryArg,
      }),
      providesTags: ["document"],
    }),
    getTopViewDocument: build.query<
      GetListDocumentApiResponse | ErrorResponse,
      GetListDocumentApiArg
    >({
      query: (queryArg) => ({
        url: "/document/top-viewed",
        params: queryArg,
      }),
      providesTags: ["document"],
    }),
    getRelatedDocuments: build.query({
      query: (params) => ({
        url: "/documents/related",
        params,
      }),
    }),
    getDetailDocument: build.query<
      GetDetailDocumentApiResponse | ErrorResponse,
      GetDetailDocumentApiArg
    >({
      query: (queryArg) => ({
        url: `/document/${queryArg?.id}`,
        params: queryArg,
      }),
    }),
    payment: build.mutation<
      PostDocumentApiResponse | ErrorResponse,
      { document_ids: number[]; referral_code?: string }
    >({
      query: (data) => ({
        url: "/document/payment",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["document"],
    }),
    postDocument: build.mutation<
      PostDocumentApiResponse | ErrorResponse,
      FormData
    >({
      query: (data) => ({
        url: "/document",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["document"],
    }),
    putDocument: build.mutation<
      PostDocumentApiResponse | ErrorResponse,
      PutDocumentApiArg
    >({
      query: (data) => ({
        url: `/document/${data.id}`,
        body: data.body,
        method: "PUT",
      }),
      invalidatesTags: ["document"],
    }),
    deleteDocument: build.mutation<
      DeleteDocumentApiResponse | ErrorResponse,
      DeleteDocumentApiArg
    >({
      query: (queryArg) => ({
        url: `/document/${queryArg?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["document"],
    }),
  }),
});

export type DeleteDocumentApiResponse = {
  data: {
    message: string;
    statusCode: number;
  };
};
export type DeleteDocumentApiArg = {
  id: number;
};

export type PutDocumentApiArg = {
  id: number;
  body: FormData;
};

export type PostDocumentApiResponse = {
  message: string;
  statusCode: number;
  data: TypeDocument;
};

export type GetDetailDocumentApiResponse = {
  data: TypeDocument;
  message: string;
  statusCode: number;
};
export type GetDetailDocumentApiArg = {
  id: number;
};

export type GetListDocumentApiResponse = {
  message?: string;
  statusCode?: number;
  data: {
    data?: TypeDocument[];
    pagination?: PaginationType;
  };
};
export type GetListDocumentApiArg = {
  keyword?: string;
  page?: number;
  limit?: number;
  subject_id?: number;
  category_id?: number;
  university_id?: number;
  user_id?: number;
  status?: string;
};

export type TypeDocument = {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  file_path?: string;
  instruct_path?: string;
  user_id?: number;
  subject_id?: number;
  university_id?: number;
  view_count?: number;
  download_count?: number;
  status?: UserStatusType;
  created_at?: string;
  updatedAt?: string;
  file?: any;
  instruct?: any;
  subject?: TypeSubject;
  university?: TypeUniversity;
  user?: TypeUser;
  documentCategories: DocumentCategoryType[];
  fileImages?: FileImages[];
  orderItems?: OrderItem[];
};

export type OrderItem = {
  id?: number;
  document_id?: number;
  order_id?: number;
  order?: TypeOrder;
};

export type TypeOrder = {
  id?: number;
  user_id?: number;
  total_amount?: number;
  status?: UserStatusType;
  created_at?: string;
  updatedAt?: string;

  user?: TypeUser;
};

export type FileImages = {
  id?: number;
  name?: string;
  image_path?: string;
  created_at?: string;
  updated_at?: string;
};

export type DocumentCategoryType = {
  documentId?: number;
  categoryId?: number;
  category?: TypeCategory;
};

export type TypeCategory = {
  id?: number;
  name?: string;
  status?: UserStatusType;
  createdAt?: string;
  updatedAt?: string;
};

export { injectedRtkApi as DocumentApi };
export const {
  useGetPurchasedDocumentQuery,
  useLazyGetPurchasedDocumentQuery,
  useGetDocumentPreviewQuery,
  useLazyGetDocumentPreviewQuery,
  useGetTopViewDocumentQuery,
  useLazyGetTopViewDocumentQuery,
  useGetListDocumentQuery,
  useLazyGetListDocumentQuery,
  useGetRelatedDocumentsQuery,
  useLazyGetRelatedDocumentsQuery,
  useGetDetailDocumentQuery,
  useLazyGetDetailDocumentQuery,
  usePaymentMutation,
  usePostDocumentMutation,
  usePutDocumentMutation,
  useDeleteDocumentMutation,
} = injectedRtkApi;
