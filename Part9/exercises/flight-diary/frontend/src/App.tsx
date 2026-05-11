import { useEffect, useState } from 'react';
//services
import { getAllEntries } from './services/diaryServices';
//types
import type { DiaryEntry } from './types';
//components
import Notes from './components/notes';

const App = () => {
    const [notes, setNotes] = useState<DiaryEntry[]>([]);

    useEffect(() => {
        const getEntries = async () => {
            const data = await getAllEntries();
            setNotes(data);
        }
        getEntries();
    }, []);


    return (
        <div>
            <Notes entries={notes} />
        </div>
    );
};

export default App;