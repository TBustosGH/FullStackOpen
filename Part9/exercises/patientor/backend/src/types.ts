//diagnoses
export interface TypeDiagnoses {
    code: string;
    name: string;
    latin?: string;
}
//patients
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface TypePatient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender; 
    occupation: string;
}

export type patientWithoutSsn = Omit<TypePatient, 'ssn'>;

export type TypeNewPatient = Omit<TypePatient, 'id'>;