import { useState } from "react";
import styles from "./AssignmentModal.module.scss";
import { useChangePatientMutation, useGetPatientByIdQuery } from "src/store/patientAPI";

interface AssignmentModalProps {
    id: number
    onClick: () => void
}

function AssignmentModal({id ,onClick}: AssignmentModalProps) {
    const [inputValue, setInputValue] = useState("");
    const [isUrgent, setIsUrgent] = useState(true);
    const [changePatientInfo, {}] = useChangePatientMutation();
    const patientQuery = useGetPatientByIdQuery(id);
    const patient = patientQuery.data;

    const handleClick = async () => {
        try {
          const assignments = patient?.assignments ? [...patient.assignments] : [];
          assignments.push({ titles: [inputValue], urgent: isUrgent });
          await changePatientInfo({ id: patient?.id, body: { assignments } }).unwrap();
          onClick();
        } catch (error) {
          console.error('Ошибка при добавлении назначения:', error);
        }

      };

    return (
        <div>
            <div className={styles.assignmentModal}>
                <input
                    placeholder="Assignment"
                    type="text"
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                />
                <div className={styles.urgentMenu}>
                    <span>Is this assignment urgent?</span>
                    <input type="checkbox" checked={isUrgent} onClick={() => setIsUrgent(!isUrgent)}/>
                </div>

                <button onClick={handleClick}>Add</button>
            </div>
            <div className={styles.assignmentModalBackground} onClick={onClick}></div>
        </div>
    )
}

export default AssignmentModal;