import { apiWrapper } from "@/store/apiWrapper";
import { ErrorResponse } from "@/type/global";

const injectedRtkApi = apiWrapper.injectEndpoints({
  endpoints: (build) => ({
    postVnPay: build.mutation<
      PostVnPayApiResponse | ErrorResponse,
      PostVnPayArg
    >({
      query: (data) => ({
        url: "/vnpay/create-payment",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["vnpay"],
    }),
  }),
});

export type PostVnPayApiResponse = {
  message: string;
  statusCode: number;
  data: any;
};

export type PostVnPayArg = {
  amount: number;
  description: string;
};

export { injectedRtkApi as VnPayApi };
export const { usePostVnPayMutation } = injectedRtkApi;
