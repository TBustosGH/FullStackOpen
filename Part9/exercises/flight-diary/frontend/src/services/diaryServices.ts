import type { NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries/';

export const getAllEntries = async () => {
    const response = await fetch(baseUrl);
    const entries = await response.json();
    return await entries;
};

export const addNewEntry = async (object: NewDiaryEntry ) => {
    const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(object)
    }
    const response = await fetch(baseUrl, config);
    const addedEntry = await response.json();
    return await addedEntry;
};