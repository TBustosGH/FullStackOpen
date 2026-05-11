import type { DiaryEntry } from '../types';

interface EntriesProps {
    entries: DiaryEntry[]
}

const Entries = (props: EntriesProps) => {
    return (
        <div>
            <h2>Diary entries</h2>

            {props.entries.length === 0
            ? <p>No entries available!</p>
            : <div> 
                {props.entries.map(entrie =>
                    <div key={entrie.date}>
                        <h3>{entrie.date}</h3>
                        <p>Visibility: {entrie.visibility}</p>
                        <p>Weather: {entrie.weather}</p>
                    </div>
                )}
            </div>
            }
        </div>
    )
};

export default Entries;