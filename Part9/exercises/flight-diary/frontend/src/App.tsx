import { useEffect, useState } from 'react';
//services
import { getAllEntries } from './services/diaryServices';
//types
import type { DiaryEntry } from './types';
//components
import EntryForm from './components/EntryForm';
import Entries from './components/Entries';

const App = () => {
    const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

    useEffect(() => {
        const getEntries = async () => {
            const data = await getAllEntries();
            setDiaryEntries(data);
        }
        getEntries();
    }, []);


    return (
        <div>
            <EntryForm />
            <Entries entries={diaryEntries} />
        </div>
    );
};

export default App;