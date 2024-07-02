import { ISpot } from './CommonInterfaces';
import { IAssignment } from './IAssignment';
import { IDossier } from './IDossier';

export interface Patient {
    userId: number
    id: number
    lastName: string
    firstName: string
    surname: string
    spot: ISpot
    status: string
    assignments: IAssignment[]
    dossier: IDossier
    title: string
    completed: boolean
}
