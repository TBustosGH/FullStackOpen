import { SetStateAction, useEffect, useState } from 'react';

import type { Patient, Diagnoses} from '../../types';

interface EntryListProps {
    patient: Patient;
    diagnoses: Diagnoses;
}

const EntryList = ({ patient, diagnoses }: EntryListProps) => {
    const [patientDiagnoses, setPatientDiagnoses] = useState<Diagnoses>(null);
    const filterDiagnoses = () => {
        if (!diagnoses || !patient || patient.entries?.length === 0) {
            return null;
        };

        let filteredDiagnosis: SetStateAction<Diagnoses> = [];
        //es una chanchada esto
        diagnoses.map(diagnosis => {
            patient.entries?.map(entry => {
                entry.diagnosisCodes?.map(code => {
                    if (diagnosis.code === code) {
                        filteredDiagnosis.push(diagnosis);
                    }
                });
            });
        });
        
        if (filteredDiagnosis.length === 0) {
            setPatientDiagnoses(null);
            return null;
        }
        setPatientDiagnoses(filteredDiagnosis);
    };

    useEffect(() => {
        setTimeout(() => {
            void filterDiagnoses();
        }, 2000)
    }, []);

    return (
        <div>
            <h2>entries</h2>

            {
                patient.entries && patient.entries.length >= 1
                ?<div>
                    {patient.entries.map(entry => (
                        <div key={entry.id}>
                            <p key={entry.id}>{entry.date} {entry.description}</p>
                            <ul>
                                {patientDiagnoses?.map(diagnosis =>
                                    <li key={diagnosis.code}>
                                        {`${diagnosis.code}:\t\t ${diagnosis.name}`}
                                    </li>
                                )}
                            </ul>
                        </div>
                    ))}
                    
                </div>
                : <p>This patient has no entries.</p>
            }
        </div>
    )
};

export default EntryList;