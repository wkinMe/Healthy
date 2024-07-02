import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Patient } from "../interfaces/IPatient";

export const patientAPI = createApi({
    reducerPath: "patient",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3001/patients"}),
    tagTypes: ["Patients"],
    endpoints: (builder) => ({
        getPatientsByWard: builder.query<Patient[], {department: string, house: number, floor: number, ward: number}>({
            query: ({department, house, floor, ward}) => `/?spot.department=${department}&spot.house=${house}&spot.floor=${floor}&spot.ward=${ward}`,
            providesTags: ['Patients']
        }),
        getPatientByFloor: builder.query<Patient[], {department: string, house: number, floor: number}>({
            query: ({department, house, floor}) => `/?spot.department=${department}&spot.house=${house}&spot.floor=${floor}`,
            providesTags: ['Patients']
        }),
        getPatientById: builder.query<Patient, number>({
            query: (id) => `/${id}`,
            providesTags: ['Patients']
        }),
        changePatient: builder.mutation({
            query: ({id, body}) => ({
              url: `/${id}`,
              method: 'PATCH',
              body: body,
            }),
            invalidatesTags: ['Patients']
        }),
    })
})

export const {
    useGetPatientByIdQuery,
    useGetPatientsByWardQuery,
    useGetPatientByFloorQuery,
    useChangePatientMutation} = patientAPI;
