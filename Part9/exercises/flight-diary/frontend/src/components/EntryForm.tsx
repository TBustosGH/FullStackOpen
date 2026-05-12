import { useState } from 'react';

import { addNewEntry } from '../services/diaryServices';
import type { NewDiaryEntry, DiaryEntry, Visibility, Weather } from '../types';

interface EntryFormProps {
    diaryState: DiaryEntry[]
    setDiaryState: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
};

const EntryForm = (props: EntryFormProps) => {
    const [dateField, setDateField] = useState('');
    const [visibilityField, setVisibilityField] = useState<Visibility>('great');
    const [weatherField, setWeatherField] = useState<Weather>('sunny');
    const [commentField, setCommentField] = useState('');

    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const newEntry: NewDiaryEntry = {
            date: dateField,
            weather: weatherField,
            visibility: visibilityField,
            comment: commentField
        }

        try {
            //call addNewEntry function to make a post to the backend
            const addedEntry = await addNewEntry(newEntry);
            //add addedEntry to the current state
            props.setDiaryState(props.diaryState.concat(addedEntry));
            //reset input
            setDateField('');
            setVisibilityField('great');
            setWeatherField('sunny');
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
                    great   <input type='radio' name='visibility' onChange={() => setVisibilityField('great')} defaultChecked/>
                    good    <input type='radio' name='visibility' onChange={() => setVisibilityField('good')} />
                    ok      <input type='radio' name='visibility' onChange={() => setVisibilityField('ok')} />
                    poor    <input type='radio' name='visibility' onChange={() => setVisibilityField('poor')} />
                </div>
                <div>
                    Weather:
                    sunny   <input type='radio' name='weather' onChange={() => setWeatherField('sunny')} defaultChecked/>
                    rainy   <input type='radio' name='weather' onChange={() => setWeatherField('rainy')} />
                    cloudy  <input type='radio' name='weather' onChange={() => setWeatherField('cloudy')} />
                    stormy  <input type='radio' name='weather' onChange={() => setWeatherField('stormy')} />
                    windy   <input type='radio' name='weather' onChange={() => setWeatherField('windy')} />
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