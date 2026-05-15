//data
import patients from '../../data/patients';
//types
import { NonSensitivePatient, TypePatient, TypeNewPatient, Entry } from '../types';
//library
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getPatientById = (id: string): TypePatient => {
    const foundPatient = patients.find(patient => patient.id === id);

    if (!foundPatient) {
        throw new Error('No user found');
    }

    return foundPatient;
};

const addPatient = (patient: TypeNewPatient): TypePatient => {
    const newPatient = {
        id: uuid(),
        ...patient,
        entries: {} as Array<Entry>
    };

    patients.push(newPatient);
    return newPatient;
}

export default {
    getPatients,
    getPatientById,
    addPatient
}