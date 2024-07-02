import { useSelector } from "react-redux"
import cn from "classnames"

import { RootState } from "src/store/store"

import styles from "./ActivityMenu.module.scss"
import { Link, useLocation } from "react-router-dom"
import { useGetPatientByFloorQuery } from "src/store/patientAPI"

function ActivityMenu() {
    const isOpen = useSelector((state: RootState) => state.appReducer.menuOpened);
    const path = useLocation().pathname;
    const {department, house, floor} = useSelector((state: RootState) => state.appReducer.workPlace);
    const patients = useGetPatientByFloorQuery({department, house, floor}).data;

    const isActivityMenuPage = path !== "/" && !path.startsWith("/ward") && !path.startsWith("/assignments");
    if (isActivityMenuPage) {
        return null;
    }

    return (patients &&
        <div className={styles.activityMenu} style={{ transform: `translateX(${isOpen ? "0" : "110"}%)` }}>
            <ul className={styles.activityMenuList}>
                {patients.map(p => {
                    return (
                        <Link to={`assignments/${p.id}`}>
                            <li className={cn(styles.listItem, p.status)}>
                            <div className={styles.patientImage}></div>
                            <div className={styles.patientInfo}>
                                <div className={styles.patientInfoRowTitle}>
                                    <span className={styles.patientName}>
                                        {`${p.lastName} ${p.firstName[0].toUpperCase()}.${p.surname[0].toUpperCase()}.`}
                                    </span>
                                    <span className={styles.patientWard}>{p.spot.ward + " п." + p.spot.bed + " к."}</span>
                                </div>
                                {p.assignments.map(a => {
                                    return (
                                        <div className={styles.patientInfoRow}>
                                            <ul className={styles.patientAssignments}>
                                                {a.titles.map(t => {
                                                    return (
                                                        <span className={styles.patientAssignmentTitle}>{t}</span>
                                                    )
                                                })}
                                            </ul>
                                            <span className={styles.patientAssignmentDateTime}>{a.urgent && "Urgent"}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </li>
                        </Link>
                    )
                })}
            </ul>
        </div>
    )
}

export default ActivityMenu