import { useState } from "react";
import styles from "./Ward.module.scss";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { useGetPatientsByWardQuery } from "src/store/patientAPI";

function Ward() {
    const {department, house, floor, ward} = useSelector((state: RootState) => state.appReducer.workPlace);
    const wardPatients = useGetPatientsByWardQuery({department, house, floor, ward}).data;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chosenUserId, setChosenUserId] = useState(-1);

    if (wardPatients) {
        return (
            <section className={styles.wardSection}>
                 {isModalOpen &&
                    <>
                        <dialog className={styles.modal}>
                            <Link to={`/assignments/${chosenUserId}`}>Меню назначений</Link>
                            <Link to={`/dossier/${chosenUserId}`}>Досье</Link>
                        </dialog>
                        <div className="modal-background" onClick={() => setIsModalOpen(false)}></div>
                    </>
                }

                <ol className={styles.patientsList}>
                    {wardPatients.map((item, index) => {
                        return (
                            <li key={index} className={item.status} onClick={() => {
                                setChosenUserId(index);
                                setIsModalOpen(true);
                            }}>
                                <div className={styles.cardTitle}>
                                    <span className={styles.cardTitleName}>{item.lastName} {item.lastName[0].toUpperCase()}.{item.surname[0].toUpperCase()}.</span>
                                    <span className={styles.cardTitleBedNumber}>Кровать {index + 1}</span>
                                </div>
                                <ol className={styles.assignmentsList}>
                                    {item.assignments.map((a, i) => {
                                        return (
                                            <div key={i} className={styles.assignment}>
                                                <ul className={styles.assignmentTitles}>
                                                    {a.titles.map((t, i) => {
                                                        return (
                                                            <li key={i}>
                                                                {t}
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                                <span className={
                                                    cn(styles.assignmentUrgent, a.urgent ? styles.urgent : "")
                                                }>
                                                    {a.urgent ? "Urgent" : ""}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </ol>
                            </li>
                        )
                    })}
                </ol>
            </section>
        )
    }
}

export default Ward;