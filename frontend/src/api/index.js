import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthToken, setAuthToken } from '../services/localRepository';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    const accessToken = getAuthToken();
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error?.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: '/login',
        method: 'post',
        body: {
          login: process.env.REACT_APP_MANAGER_LOGIN,
          password: process.env.REACT_APP_MANAGER_PASSWORD,
        },
      },
      api,
      extraOptions
    );

    if (refreshResult.data.token) {
      setAuthToken(refreshResult.data.token)

      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ login, password }) => ({
        url: '/login',
        method: 'POST',
        body: { login, password },
      }),
    }),
    personalLoanTemplate: builder.query({
      query: () => ({
        url: '/scenario-1/template',
      }),
    }),
    personalLoan: builder.mutation({
      query: (body) => ({
        url: '/scenario-1',
        method: 'POST',
        body,
      }),
    }),
    hrLetterTemplate: builder.query({
      query: () => ({
        url: '/scenario-2/template',
      }),
    }),
    hrLetter: builder.mutation({
      query: (body) => ({
        url: '/scenario-2',
        method: 'POST',
        body,
      }),
    }),
    legalFormTemplate: builder.query({
      query: () => ({
        url: '/scenario-3/template',
      }),
    }),
    legalForm: builder.mutation({
      query: (body) => ({
        url: '/scenario-3',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLazyPersonalLoanTemplateQuery,
  usePersonalLoanMutation,
  useLazyHrLetterTemplateQuery,
  useHrLetterMutation,
  useLazyLegalFormTemplateQuery,
  useLegalFormMutation,
} = api;
