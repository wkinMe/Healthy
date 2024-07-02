import { Link } from "react-router-dom";

import styles from "./Home.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { setSpot } from "src/store/appSlice";
import { getWardsAmount } from "src/utils/utils";
import { useGetPatientByFloorQuery } from "src/store/patientAPI";


function Home() {
    const dispatch = useDispatch();
    const {department, house, floor} = useSelector((state: RootState) => state.appReducer.workPlace);
    const patients = useGetPatientByFloorQuery({department, house, floor}).data;
    const wardsAmount = patients && getWardsAmount(patients);
    let wards = [] as number[];

    if (wardsAmount && wardsAmount > 0) {
        wards = new Array(wardsAmount);
        if (wardsAmount) {
            for (let i = 0; i < wardsAmount; i++) {
                wards[i] = i
            }
        }
    }

    return (
        <div className={styles.home}>
            <div className={styles.content}>
                {(wardsAmount &&
                wardsAmount > 0) ?
                wards.map((i) => {
                    return (
                        <Link   key={i} to={`ward/${i+1}`}
                                className={styles.wardLink}
                                onClick={() => dispatch(setSpot({department, house, floor, ward: i+1}))}>
                            {i+1} п.
                        </Link>
                    )
                }) : null}
            </div>
        </div>
    )
}

export default Home;