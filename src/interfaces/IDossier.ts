
import { IPreviousDisease } from "./IPreviousDisease"

export interface IDossier {
    dateOfBirth: string
    previousDiseases: IPreviousDisease[]
    contradictions: string[]
}