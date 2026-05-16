import type { Entry } from '../../types';

const HealtCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <div>
            <h3>{entry.date}</h3>
            <p>{entry.description}.</p>

            <p>diagnose by {entry.specialist}</p>
        </div>
    )
};

const OccupationalHealtcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    const employer = entry.type === 'OccupationalHealthcare' 
        ? entry.employerName
        : 'no employer name given';

    return (
        <div>
            <h3>{entry.date}    {employer}</h3>
            <p>{entry.description}.</p>
            <p>diagnose by {entry.specialist}</p>
        </div>
    );
};

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <div>
            <h3>{ entry.date }</h3>
            <p>{entry.description}.</p>

            <p>diagnose by {entry.specialist}</p>
        </div>
    );
};

const EntryDetails: React.FC<{ entry: Entry}> = ({ entry }) => {
    try {
        switch (entry.type) {
            case 'HealthCheck':
                return <HealtCheckEntry entry={entry} />;
            case 'Hospital':
                return <HospitalEntry entry={entry} />;
            case 'OccupationalHealthcare':
                return <OccupationalHealtcareEntry entry={entry} />;
            default: 
                throw new Error('Not valid Entry type on EntryDetails!');
        }
    } catch (error) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
    }
};

export default EntryDetails;