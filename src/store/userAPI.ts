import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "src/interfaces/IUser";

export const userAPI = createApi({
    reducerPath: "user",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3001/users"}),
    endpoints: (builder) => ({
        authUser: builder.query<IUser, {login: string, password: string}>({
            query: ({login, password}) => `?login=${login}&password=${password}`
        }),
        getUser: builder.query<IUser, {id: number}>({
            query: ({id}) => `/${id}`
        })
    })
})

export const { useLazyAuthUserQuery, useGetUserQuery } = userAPI;
