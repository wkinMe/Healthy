import { Outlet, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useResize } from "src/CustomHooks/useResize";

import { toggleMenu } from "src/store/appSlice";
import { RootState } from "src/store/store";

import Header from "../Header";
import ActivityMenu from "../ActivityMenu";
import { createContext } from "react";

// Используем createContext, вместо глобального store, т.к. значение длины нужно не на всём
// приложении, а только в некоторых компонентах

export const WidthContext = createContext(window.innerWidth);

function HomeLayout() {
    const dispatch = useDispatch();

    const isOpen = useSelector((state: RootState) => state.appReducer.menuOpened);
    const width = useResize();

    const path = useLocation().pathname;
    const isMenuPage = path === "/" || path.startsWith("/ward") || path.startsWith("/assignment");

    if (width > 770 && !isOpen) {
        dispatch(toggleMenu({ open: true }));
    }

    return (
        <WidthContext.Provider value={width}>
            <Header />
            <ActivityMenu />
            <Outlet />
            {(isOpen && isMenuPage && width <= 770) && (
                <div className="modal-background" onClick={() => dispatch(toggleMenu({ open: !isOpen }))}></div>
            )}
        </WidthContext.Provider>
    )
}

export default HomeLayout