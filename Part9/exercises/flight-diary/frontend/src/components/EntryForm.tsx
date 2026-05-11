import { useState } from 'react';

import { addNewEntry } from '../services/diaryServices';
import type { NewDiaryEntry, Visibility, Weather } from '../types';

const EntryForm = () => {
    const [dateField, setDateField] = useState('');
    const [visibilityField, setVisibilityField] = useState<Visibility>('');
    const [weatherField, setWeatherField] = useState<Weather>('');
    const [commentField, setCommentField] = useState('');

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const newEntry: NewDiaryEntry = {
            date: dateField,
            weather: weatherField,
            visibility: visibilityField,
            comment: commentField
        }

        const addedEntry = await addNewEntry(newEntry);
        console.log(addedEntry);
    }

    return (
        <div>
            <h2>Add new entry</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    date:
                    <input
                    type='date'
                    value={dateField}
                    onChange={({ target }) => setDateField(target.value)}
                    required
                    />
                </div>
                <div>
                    Visibility:
                    <input
                        type='text'
                        value={visibilityField}
                        onChange={({ target }) => setVisibilityField(target.value)}
                        required
                    />
                </div>
                <div>
                    Weather:
                    <input
                        type='text'
                        value={weatherField}
                        onChange={({ target }) => setWeatherField(target.value)}
                        required
                    />
                </div>
                <div>
                    comment:
                    <input
                        type='textarea'
                        value={commentField}
                        onChange={({ target }) => setCommentField(target.value)}
                        required
                    />
                </div>

                <button type='submit'>add</button>
            </form>
        </div>
    );
};

export default EntryForm;