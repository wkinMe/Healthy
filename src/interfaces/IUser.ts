import { IFloor } from "./CommonInterfaces";

export interface IUser {
    id: number,
    login: string,
    password: string,
    allowedPlaces: IFloor[]
}