import PatientInfo from "src/Components/PatientInfo";
import styles from "./Dossier.module.scss";
import { useParams } from "react-router-dom";
import { useGetPatientByIdQuery } from "src/store/patientAPI";

function Dossier() {
    const {id} = useParams();

    const patientQuery = id && useGetPatientByIdQuery(+id);
    let patient;
    if (patientQuery && patientQuery.data) {
        patient = patientQuery.data;
    }

    return (patient &&
        <div className={styles.dossier}>
            <div className={styles.dossierHeader}>
                <PatientInfo patient={patient}/>
                {patient.assignments.length != 0 && <button className={styles.dischargeBtn}>
                    Выписать
                </button>}
            </div>
            <div className={styles.dossierContent}>
                <h2 className={styles.dossierContentTitle}>Перенесённые заболевания</h2>
                <ul className={styles.dossierContentList}>
                    {patient.dossier.previousDiseases.map(d => {
                        return (
                            <li>
                                <h3><span>{d.title};</span> <span>{d.ageOfIllness};</span>{d.startOfTreatment} - {d.endOfTreatment}<span></span></h3>
                                <span>{d.comments}</span>
                            </li>
                        )
                    })}
                </ul>
                <h2 className={styles.dossierContentTitle}>Противопоказания</h2>
                <ul className={styles.dossierContentList}>
                    {patient.dossier.contradictions?.map(c => {
                        return (
                            <li>
                                <h3>{c}</h3>
                            </li>
                        )
                    })}
                </ul>

            </div>
        </div>
    )
}

export default Dossier;