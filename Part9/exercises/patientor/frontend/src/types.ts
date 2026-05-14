export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

//patients
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

interface BaseEntryPatient {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
};

export enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3
}

export interface HealtCheckEntry extends BaseEntryPatient {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}

interface SickLeave {
    startDate: Date | string;
    endDate: Date | string;
}

export interface OccupationalHealthCareEntry extends BaseEntryPatient {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?:  SickLeave;
}

interface Discharge {
    date: Date | string;
    criteria: string
}

export interface HospitalEntry extends BaseEntryPatient {
    type: 'Hospital';
    discharge: Discharge
}

export type Entry = HealtCheckEntry | OccupationalHealthCareEntry | HospitalEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[]
}

export type FoundPatient = Patient | null;

export type PatientFormValues = Omit<Patient, "id" | "entries">;