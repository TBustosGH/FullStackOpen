import { useState, useEffect } from 'react';
import patientServices from '../../services/patients';
import type { FoundPatient } from '../../types';
import { useParams } from 'react-router-dom';


const PatientPage = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<FoundPatient>(null);
    
    useEffect(() => {
        const getPatient = async () => {
            if (id) {
                const foundPatient = await patientServices.getById(id);
                setPatient(foundPatient);
            }
        };
        void getPatient();
    }, [id]);

    if (patient === null) {
        return (
            <h3>No patient found!</h3>
        );
    };

    return (
        <div>
            <h3>{patient.name}</h3>

            <p>ssh: {patient.ssn || ' none'}</p>
            <p>occupation: {patient.occupation}</p>
        </div>
    );
};

export default PatientPage;