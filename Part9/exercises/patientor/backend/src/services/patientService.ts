import patients from '../../data/patients';

import { patientWithoutSsn } from '../types';

const getPatients = (): patientWithoutSsn[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
}

export default {
    getPatients
}