import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Book } from '../types/bookcard';
export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:5000/',
    credentials: 'same-origin',
  }),
  tagTypes: ['Books', 'Rec', 'User'],
  endpoints: (builder) => ({
    getBooks: builder.query<
      { books: Book[]; pages: number; page: number },
      string
    >({
      query: (page) => `books?${page && `page=${page}`}`,
      providesTags: () => ['Books'],
    }),
    getRecBooks: builder.query<{ rec_books: Book[] }, void>({
      query: () => 'rec_user',
      providesTags: () => ['Books', 'Rec', 'User'],
    }),
  }),
});

export const { useGetBooksQuery, useGetRecBooksQuery } = booksApi;
