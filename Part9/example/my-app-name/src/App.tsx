import { useState, useEffect } from 'react';
import axios from 'axios';
//types
import type { Note } from './types';
//note services
import { getAllNotes, createNote } from './services/noteServices';

//App
/*const App = () => {
    const courseName = 'Half Stack application development';
    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is an awesome course part",
            kind: 'basic'   //kind atribute defines the especific type of this object
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3,
            kind: 'group'
        },
        {
            name: "Basics of type Narrowing",
            exerciseCount: 7,
            description: "How to go from unknown to string",
            kind: 'basic'
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
            kind: 'background'
        },
    ];

    //detect unhandled data types
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled descriminated union member: ${JSON.stringify(value)}`
        );
    };

    courseParts.forEach(part => {
        switch (part.kind) {
            case 'basic':
                console.log(part.name, part.description, part.exerciseCount);
                break;
            case 'group':
                console.log(part.name, part.exerciseCount, part.groupProjectCount);
                break;
            case 'background':
                console.log(part.name, part.description, part.backgroundMaterial);
                break;
            default:
                return assertNever(part);    //unhandled data type detected, throw an error
        }   
    });

    return (
        <div>
            <h1>{courseName}</h1>
            <div>
                hello
            </div>
        </div>
    );
};*/


const App = () => {
    const [newNote, setNewNote] = useState('');
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        getAllNotes().then(data => {
            setNotes(data);
        });
    }, []);

    const noteCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();
        createNote({ content: newNote }).then(data => {
            setNotes(notes.concat(data));
        });
        setNewNote('');
    };

    return (
        <div>
            <form onSubmit={noteCreation}>
                <input
                    value={newNote}
                    onChange={(event) => setNewNote(event.target.value)}
                    required
                />
                <button type='submit'>add</button>
            </form>
            <ul>
                {notes.map(note => 
                    <li key={note.id}>{note.content}</li>
                )}
            </ul>
        </div>
    );
};

export default App
