import { useState } from 'react';

import { addNewEntry } from '../services/diaryServices';
import type { NewDiaryEntry, DiaryEntry, Visibility, VisibilityInput, Weather, WeatherInput } from '../types';

interface EntryFormProps {
    diaryState: DiaryEntry[]
    setDiaryState: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
};

const EntryForm = (props: EntryFormProps) => {
    const [dateField, setDateField] = useState('');
    const [visibilityField, setVisibilityField] = useState<VisibilityInput>('');
    const [weatherField, setWeatherField] = useState<WeatherInput>('');
    const [commentField, setCommentField] = useState('');

    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const newEntry: NewDiaryEntry = {
            date: dateField,
            weather: weatherField as Weather,
            visibility: visibilityField as Visibility,
            comment: commentField
        }

        try {
            //call addNewEntry function to make a post to the backend
            const addedEntry = await addNewEntry(newEntry);
            //add addedEntry to the current state
            props.setDiaryState(props.diaryState.concat(addedEntry));
            //reset input
            setDateField('');
            setVisibilityField('');
            setWeatherField('');
            setCommentField('');
        } catch (error) {
            let message = 'Error: ';   //start errorMessage
            if (error instanceof Error) {
                message += error.message;  //add the actual error message
            }
            //set errorMessage 
            setErrorMessage(message);
            //reset errorMessage state after 5 seconds
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    }

    return (
        <div>
            <h2>Add new entry</h2>
            <p style={{ color: 'red' }}>{errorMessage}</p>
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