import { useDispatch, useSelector } from "react-redux";
import { setSpot } from "src/store/appSlice";
import styles from "./ChoosePlace.module.scss";
import BreadCrumbs from "../../Components/BreadCrumbs";
import { RootState } from "src/store/store";
import { Navigate } from "react-router-dom";
import { useGetUserQuery } from "src/store/userAPI";

function ChoosePlace() {
    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.appReducer.userId);
    const workPlaces = useGetUserQuery({id: userId}).data?.allowedPlaces;
    const workPlace = useSelector((state: RootState) => state.appReducer.workPlace);

    if (workPlace.department) {
        return <Navigate to="/"/>
    }

    return (
        <div className={styles.choosePlace}>
            <div className={styles.choosePlaceBlock}>
                <ul>
                    {workPlaces && workPlaces.map((p, i) => {
                        const house = Number(p.house);
                        const floor = Number(p.floor);
                        return (
                            <li key={i} onClick={() => dispatch(setSpot({department: p.department, house, floor}))}>
                                <BreadCrumbs isHeader={false} links={[p.department, p.house + " корпус", p.floor + " этаж"]}/>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default ChoosePlace;