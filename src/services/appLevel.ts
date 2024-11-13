
import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const axiosBaseQuery = (baseUrl: string) => async (payload: any) => {
  try {
    const result = await axios({
      url: baseUrl + payload?.url,
      method: payload?.method,
      data: payload?.body,
      headers: payload?.headers,
    });
    return { data: result?.data };
  } catch (axiosError) {
    const err: any = axiosError;
    return {
      error: {
        status: err?.response?.status,
        data: err?.response?.data || err?.message,
      },
    };
  }
};


export const appLevelApi = createApi({
  reducerPath: 'AppLevel_SolzitApi', 
  baseQuery: axiosBaseQuery('https://solzitessapi-dev.azurewebsites.net/api/V1/Auth/'),  
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: 'Authenticate',
        method: 'POST',
        body: data, 
      }),
    }),
  }),
});


export const { useLoginMutation } = appLevelApi;
