export interface IFloor {
    department: string
    house: number
    floor: number
}

export interface IWard extends IFloor {
    ward: number
}

export interface ISpot extends IWard {
    bed: number
}