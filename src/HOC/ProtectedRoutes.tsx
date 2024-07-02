import { useSelector } from "react-redux";

import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "src/store/store";

export const AuthProtectedRoute = () => {
    const isAuth = useSelector((state: RootState) => state.appReducer.isUserAuth);
    return (isAuth ? <Outlet /> : <Navigate to="/login/" replace={true} />)
}

export const WorkPlaceProtectedRoute = () => {
    const workPlace = useSelector((state: RootState) => state.appReducer.workPlace);
    return (workPlace.department ? <Outlet/> : <Navigate to="/choosePlace/" replace={true}/>)
}
