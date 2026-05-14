import type { Patient } from '../../types';

interface EntryListProps {
    patient: Patient;
}

const EntryList = ({ patient }: EntryListProps) => {
    return (
        <div>
            <h2>entries</h2>

            {
                patient.entries 
                ?<div>
                    {patient.entries.map(entry => (
                        <div>
                            <p key={entry.id}>{entry.date} {entry.description}</p>
                            <ul>
                                {entry.diagnosisCodes?.map(code =>
                                    <li key={code}>{code}</li>
                                )}
                            </ul>
                        </div>
                    ))}
                    
                </div>
                : <p>This patient has no entries.</p>
            }
        </div>
    )
};

export default EntryList;