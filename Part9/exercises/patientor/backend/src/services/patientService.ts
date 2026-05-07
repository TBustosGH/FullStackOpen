//data
import patients from '../../data/patients';
//types
import { patientWithoutSsn, TypePatient, TypeNewPatient } from '../types';
//library
import { v1 as uuid } from 'uuid';

const getPatients = (): patientWithoutSsn[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
}

const addPatient = (patient: TypeNewPatient): TypePatient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
}

export default {
    getPatients,
    addPatient
}