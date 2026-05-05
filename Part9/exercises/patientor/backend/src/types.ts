//diagnoses
export interface TypeDiagnoses {
    code: string;
    name: string;
    latin?: string;
}
//patients
export type Gender = 'male' | 'female' | 'other';

export interface TypePatient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender; 
    occupation: string;
}

export type patientWithoutSsn = Omit<TypePatient, 'ssn'>;