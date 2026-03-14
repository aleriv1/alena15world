import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://cms.alena15world.ru/wp-json";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Articles", "Article", "User"], // ИЗМЕНЕНО: добавили тег User для профиля
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/jwt-auth/v1/token",
        method: "POST",
        body: { username: email, password },
      }),
      transformResponse: (res) => ({
        user: {
          token: res.token,
          username: res.user_display_name || res.user_nicename || "admin",
          email: res.user_email,
          image: "", // аватар пока пустой
        },
      }),
    }),

    // =========================
    // ADDED: получение текущего пользователя
    // =========================
    getCurrentUser: builder.query({
      query: () => "/wp/v2/users/me?_embed", // ИЗМЕНЕНО: добавили _embed для получения аватара

      // ADDED: сразу преобразуем ответ
      transformResponse: (user) => ({
        id: user.id,
        username: user.name,
        email: user.email,
        avatar: user.avatar_urls?.["96"] || user.simple_local_avatar?.full, // ИЗМЕНЕНО: пробуем получить аватар из Simple Local Avatars
      }),
    }),

    getArticles: builder.query({
      query: ({ page = 1, limit = 10 }) =>
        `/wp/v2/posts?per_page=${limit}&page=${page}&_embed&categories=2`,
      providesTags: ["Articles"],
      transformResponse: (posts, meta) => ({
        articles: posts, // ИЗМЕНЕНО: ключ "articles" для совместимости с ArticleList
        articlesCount: Number(
          meta.response.headers.get("X-WP-Total") || posts.length,
        ), // ИЗМЕНЕНО: для пагинации
      }),
    }),

    getArticle: builder.query({
      query: (id) => `/wp/v2/posts/${id}?_embed`,
      providesTags: (result, error, id) => [{ type: "Article", id }],
    }),

    createArticle: builder.mutation({
      query: (article) => ({
        url: "/wp/v2/posts",
        method: "POST",
        body: {
          title: article.title,
          content: article.body || article.text, // ИЗМЕНЕНО: WP использует content вместо body
          status: "publish",
          categories: [2],
        },
      }),
      invalidatesTags: ["Articles"],
    }),

    updateArticle: builder.mutation({
      query: ({ id, article }) => ({
        url: `/wp/v2/posts/${id}`,
        method: "POST", // WordPress использует POST для обновления с ?_method=PUT или просто POST
        headers: {
          "Content-Type": "application/json",
        },
        body: article,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Articles",
        { type: "Article", id },
      ],
    }),

    // =========================
    // ADDED: обновление профиля пользователя
    // =========================
    updateUser: builder.mutation({
      query: (userData) => ({
        url: "/wp/v2/users/me",
        method: "POST",
        body: {
          name: userData.username,
          email: userData.email,
          ...(userData.password && { password: userData.password }),
          // ИЗМЕНЕНО: для аватара через Simple Local Avatars (если установлен)
          ...(userData.image && {
            meta: {
              simple_local_avatar: {
                full: userData.image,
              },
            },
          }),
        },
      }),
      // ИЗМЕНЕНО: обновляем кэш пользователя после сохранения
      invalidatesTags: ["User"],
      // ИЗМЕНЕНО: преобразуем ответ обратно в формат приложения
      transformResponse: (user) => ({
        user: {
          id: user.id,
          username: user.name,
          email: user.email,
          image:
            user.avatar_urls?.["96"] || user.simple_local_avatar?.full || "",
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetCurrentUserQuery, // ADDED: hook для получения пользователя
  useGetArticlesQuery,
  useGetArticleQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useUpdateUserMutation, // ADDED: hook для обновления профиля
} = api;
