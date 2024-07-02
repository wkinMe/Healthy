import appReducer from './appSlice';
import { configureStore } from "@reduxjs/toolkit";
import { patientAPI } from './patientAPI';
import { userAPI } from './userAPI';


export const store = configureStore({
    reducer: {
        appReducer,
        [patientAPI.reducerPath]: patientAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([patientAPI.middleware, userAPI.middleware])
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
