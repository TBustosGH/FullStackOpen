import type { DiaryEntry } from '../types';

interface NotesProps {
    entries: DiaryEntry[]
}

const Notes = (props: NotesProps) => {
    return (
        <div>
            <h2>Diary entries</h2>

            {props.entries.length === 0
            ? <p>No entries available!</p>
            : <div> 
                {props.entries.map(entrie =>
                    <div>
                        <h3>{entrie.date}</h3>
                        <p>Visibility: {entrie.Visibility}</p>
                        <p>Weather: {entrie.weather}</p>
                    </div>
                )}
            </div>
            }
        </div>
    )
};

export default Notes;