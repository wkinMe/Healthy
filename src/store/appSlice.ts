import { IFloor, IWard } from './../interfaces/CommonInterfaces';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface appState {
    menuOpened: boolean,
    isUserAuth: boolean;
    userId: number,
    workPlace: IWard
}

interface SetSpotAction {
    department: string
    house: number
    floor: number
    ward?: number
}

interface MenuOpenAction {
    open: boolean
}

interface SetAuthAction {
    isAuth: boolean
    userId: number
}

const appSlice = createSlice({
    name: "appSlice",
    initialState: {
        menuOpened: false,
        isUserAuth: false,
        userId: -1,
        workPlace: {
            department: "",
            house: NaN,
            floor: NaN,
            ward: NaN,
        }
    } as appState,
    reducers: {
        toggleMenu: (state, action: PayloadAction<MenuOpenAction>) => {
            state.menuOpened = action.payload.open;
        },
        setSpot: (state, action: PayloadAction<SetSpotAction>) => {
            let {department, house, floor, ward} = action.payload;
            if (ward == undefined) {
                ward = 0;
            }
            state.workPlace = {department, house, floor, ward};
        },
        setUserAuth: (state, action: PayloadAction<SetAuthAction>) => {
            state.isUserAuth = action.payload.isAuth;
            state.userId = action.payload.userId;
        },
    }
})

export default appSlice.reducer;
export const {toggleMenu, setSpot, setUserAuth} = appSlice.actions;