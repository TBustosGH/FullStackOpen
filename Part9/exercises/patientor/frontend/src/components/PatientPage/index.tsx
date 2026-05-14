import { useState, useEffect } from 'react';
import type { FoundPatient } from '../../types';
import { useParams } from 'react-router-dom';
//component
import EntryList from './EntryList';
//services
import patientServices from '../../services/patients';



const PatientPage = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<FoundPatient>(null);
    
    //get patient
    useEffect(() => {
        const getPatient = async () => {
            if (id) {
                const foundPatient = await patientServices.getById(id);
                setPatient(foundPatient);
            }
        };
        void getPatient();
    }, [id]);
    //return null if no patient was found
    if (patient === null) {
        return (
            <h3>No patient found!</h3>
        );
    };

    return (
        <div>
            <h2>{patient.name}</h2>

            <p>ssh: {patient.ssn || ' none'}</p>
            <p>occupation: {patient.occupation}</p>

            <EntryList patient={patient}/>
        </div>
    );
};

export default PatientPage;