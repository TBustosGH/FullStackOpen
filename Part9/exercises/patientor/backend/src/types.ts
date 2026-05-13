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
// eslint-disable-next-lint @typescript-eslint/no-empty-interface
export interface Entry {

}

export interface TypePatient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender; 
    occupation: string;
    entries: Entry[];
}

export type NonSensitivePatient = Omit<TypePatient, 'ssn' | 'entries'>;

export type TypeNewPatient = Omit<TypePatient, 'id' | 'entries'>;