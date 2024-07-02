import { useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { colors } from "src/styles/vars";
import { Patient } from "src/interfaces/IPatient";

const PatientInfoBlock = styled.div<{ page: string }>`
.patient {
    display: flex;
    gap: 11px;
    &Logo {
        background-color: ${colors.secondary};
        border-radius: 15px;
    }
    &Info {
        display: grid;
        grid-template-rows: 2fr 1fr 1fr;
    }

    ${props => !props.page.startsWith("/assignments") && `
        &Logo {
            width: 150px;
            height: 150px;
        }
        &Info {
            span {
                font-size: 2.4rem;
                line-height: 3.5rem;
                font-weight: 400;
            }
        }
    `}

    ${props => props.page.startsWith("/assignments") && SmallPatientInfo}
    }
}


@media screen and (max-width: 480px) {
    ${props => props.page.startsWith("/dossier") && SmallPatientInfo}
}

@media screen and (max-width: 640px) {
    ${props => props.page.startsWith("/assignments") && `
        .patient {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    `}
}
`

const SmallPatientInfo = css`
    .patient {
        &Logo {
            width: 70px !important;
            height: 70px !important;
        }

        &Info {
            :first-child {
                font-size: 1.8rem !important;
                line-height: 2.3rem !important;
                font-weight: 400;
            }

            :nth-child(2), :nth-child(3) {
                font-size: 1.6rem !important;
                line-height: 1.7rem !important;
                font-weight: 400;
            }
        }
    }
`

interface PatientInfoProps {
    patient: Patient
}

function PatientInfo({ patient }: PatientInfoProps) {
    const path = useLocation().pathname;

    const stringDate = patient.dossier.dateOfBirth.split(".").toReversed().join(".");
    const birthAgeMilliseconds = Date.parse(stringDate);
    const age = Math.floor((Date.now() - birthAgeMilliseconds) / 1000 / 60 / 60 / 24 / 365);

    return (
        <PatientInfoBlock page={path}>
            <div className="patient">
                <div className="patientLogo"></div>
                <div className="patientInfo">
                    <span>{`${patient.lastName} ${patient.firstName} ${patient.surname}`}</span>
                    <span>Дата рождения: {patient.dossier.dateOfBirth}</span>
                    <span>Полных лет: {age}</span>
                </div>
            </div>
        </PatientInfoBlock>
    )
}

export default PatientInfo;