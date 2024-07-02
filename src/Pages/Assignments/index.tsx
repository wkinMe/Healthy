import PatientInfo from "src/Components/PatientInfo";
import styles from "./Assignments.module.scss";
import { useParams } from "react-router-dom";
import { useChangePatientMutation, useGetPatientByIdQuery } from "src/store/patientAPI";
import { useState } from "react";
import AssignmentModal from "src/Components/AssignmentModal";
import { IAssignment, Patient } from "src/interfaces/IPatient";

function Assignments() {
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [changePatientInfo, {}] = useChangePatientMutation();

    const patientQuery = id && useGetPatientByIdQuery(+id);
    let patient;
    if (patientQuery && patientQuery.data) {
        patient = patientQuery.data;
    }

    const deleteAssignment = async (assignment: IAssignment) => {
        try {
            let assignments = patient.assignments ? [...patient.assignments] : [];
            assignments = assignments.filter(a => a.titles != assignment.titles);
            // debugger;
            await changePatientInfo({ id: patient?.id, body: { assignments } }).unwrap();
        } catch (error) {
            console.error('Ошибка при удалении назначения:', error);
        }
    }

    return (
        patient &&
        <div className={styles.assignmentContent}>
            <PatientInfo patient={patient} />
            <ol className={styles.assignmentList}>
                {patient.assignments.map((i, ind) => {
                    return (
                        <li key={ind} className={i.urgent ? styles.assignmentUrgent : ""}>
                            <ol className={styles.assignmentTitleList}>
                                {i.titles.map((j, ind) => {
                                    return (
                                        <li key={ind}>
                                            {j}
                                        </li>
                                    )
                                })}
                            </ol>
                            <div className={styles.assignmentDeleteButton} onClick={() => deleteAssignment(i)}>
                                <span></span>
                                <span></span>
                            </div>
                        </li>
                    )
                })}
                <li onClick={() => setIsModalOpen(true)}>
                    <div className={styles.assignmentAddButton}>
                        <span></span>
                        <span></span>
                    </div>
                </li>
            </ol>
            {isModalOpen && <AssignmentModal id={Number(id)} onClick = {() => setIsModalOpen(false)}/>}
        </div>
    )
}

export default Assignments;