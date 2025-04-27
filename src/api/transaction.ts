import { apiWrapper } from "@/store/apiWrapper";
import {
  ErrorResponse,
  TransactionStatusType,
  TransactionTypeType,
} from "@/type/global";
import { PaginationType, TypeUser } from "./user";

const injectedRtkApi = apiWrapper.injectEndpoints({
  endpoints: (build) => ({
    getListTransaction: build.query<
      GetListTransactionApiResponse | ErrorResponse,
      GetListTransactionApiArg
    >({
      query: (queryArg) => ({
        url: "/transaction",
        params: queryArg,
      }),
      providesTags: ["transaction"],
    }),
    getDetailTransaction: build.query<
      GetDetailTransactionApiResponse | ErrorResponse,
      GetDetailTransactionApiArg
    >({
      query: (queryArg) => ({
        url: `/transaction/${queryArg?.id}`,
        params: queryArg,
      }),
    }),
    postTransaction: build.mutation<
      PostTransactionApiResponse | ErrorResponse,
      TypeTransaction
    >({
      query: (data) => ({
        url: "/transaction",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["transaction"],
    }),
    putTransaction: build.mutation<
      PostTransactionApiResponse | ErrorResponse,
      PutTransactionApiArg
    >({
      query: (data) => ({
        url: `/transaction/${data.id}`,
        body: data.body,
        method: "PUT",
      }),
      invalidatesTags: ["transaction"],
    }),
    deleteTransaction: build.mutation<
      DeleteTransactionApiResponse | ErrorResponse,
      DeleteTransactionApiArg
    >({
      query: (queryArg) => ({
        url: `/transaction/${queryArg?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["transaction"],
    }),
  }),
});

export type DeleteTransactionApiResponse = {
  data: {
    message: string;
    statusCode: number;
  };
};
export type DeleteTransactionApiArg = {
  id: number;
};

export type PutTransactionApiArg = {
  id: number;
  body: TypeTransaction;
};

export type PostTransactionApiResponse = {
  message: string;
  statusCode: number;
  data: TypeTransaction;
};

export type GetDetailTransactionApiResponse = {
  data: TypeTransaction;
  message: string;
  statusCode: number;
};
export type GetDetailTransactionApiArg = {
  id: number;
};

export type GetListTransactionApiResponse = {
  message?: string;
  statusCode?: number;
  data: {
    data?: TypeTransaction[];
    pagination?: PaginationType;
  };
};
export type GetListTransactionApiArg = {
  keyword?: string;
  status?: number;
  page?: number;
  limit?: number;
};

export type TypeTransaction = {
  id?: number;
  user_id?: string;
  amount?: string;
  type?: TransactionTypeType;
  status?: TransactionStatusType;
  reference_id?: number;
  description?: string;
  created_at?: string;
  user?: TypeUser;
};

export { injectedRtkApi as TransactionApi };
export const {
  useGetListTransactionQuery,
  useLazyGetListTransactionQuery,
  useGetDetailTransactionQuery,
  useLazyGetDetailTransactionQuery,
  usePostTransactionMutation,
  usePutTransactionMutation,
  useDeleteTransactionMutation,
} = injectedRtkApi;
