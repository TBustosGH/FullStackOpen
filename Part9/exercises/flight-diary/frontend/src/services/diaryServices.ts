import type { DiaryEntry, NonSensitivediaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries/';

export const getAllEntries = async () => {
    const response = await fetch(baseUrl);
    const entries = await response.json();
    await console.log(entries);
    return await entries;
}