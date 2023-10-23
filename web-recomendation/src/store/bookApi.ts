import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Book } from "../types/bookcard";
export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/",
    credentials: "same-origin",
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], string>({
      query: (page) => `books?${page && `page=${page}`}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ ISBN }) => ({
                type: "Books" as const,
                id: ISBN,
              })),
              { type: "Books", id: "LIST" },
            ]
          : [{ type: "Books", id: "LIST" }],
    }),
  }),
});

export const { useGetBooksQuery } = booksApi;
