import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//component
import EntryList from './EntryList';
//services
import patientServices from '../../services/patients';
import diagnosisServices from '../../services/diagnoses';
//types
import type { FoundPatient, Diagnoses } from '../../types';



const PatientPage = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<FoundPatient>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnoses>(null);

    //get patient
    useEffect(() => {
        const getPatient = async () => {
            if (id) {
                const foundPatient = await patientServices.getById(id);
                setPatient(foundPatient);
            }
        };
        const getDiagnoses = async () => {
            const getDiagnoses = await diagnosisServices.getAllDiagnoses();
            setDiagnoses(getDiagnoses);
        };
        void getPatient();
        void getDiagnoses();
    }, [id]);
    //return null if no patient was found
    if (patient === null) {
        return (
            <h3>No patient found!</h3>
        );
    } else if (diagnoses === null) {
        return (
            <h3>Error fetching diagnoses!</h3>
        );
    }
    return (
        <div>
            <h2>{patient.name}</h2>

            <p>ssh: {patient.ssn || ' none'}</p>
            <p>occupation: {patient.occupation}</p>

            <EntryList patient={patient} diagnoses={diagnoses}/>
        </div>
    );
};

export default PatientPage;