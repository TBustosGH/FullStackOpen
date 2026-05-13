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

interface BaseEntryPatient {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<TypeDiagnoses['code']>;
};

export enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3
}

interface HealtCheckEntry extends BaseEntryPatient {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
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