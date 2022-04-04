import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery:   fetchBaseQuery({baseUrl: "http://localhost:8080/"}),
  endpoints:   builder => ({
    getCreditAgreement: builder.query({
      query: totalWithTax => `/credit_agreements?totalWithTax=${totalWithTax}`
    }),
    postEvents: builder.mutation({
      query: body => ({
        url:    "/events",
        method: "POST",
        body,
      })
    })
  })
});

export const { useGetCreditAgreementQuery, usePostEventsMutation } = api;