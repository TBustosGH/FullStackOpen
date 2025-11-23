import { useState } from 'react'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const AddNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content : newNote,
      important : Math.random() < 0.5,
      id : notes.length + 1
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }
  const HandleNoteChange = (event) => {
    //console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll 
  ? notes 
  : notes.filter(note => note.important)

  return(
    <div>
      <div>
        <h1>Notes</h1>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll? 'important' : 'all'}
        </button>
        <ul>
          {notesToShow.map(note =>
            <li key={note.id}>
              {note.content}
            </li>
          )}
        </ul>
      </div>
      <div>
        <h2>Write a new note!</h2>
        <form onSubmit={AddNote} >
          <input value={newNote} onChange={HandleNoteChange}/>
          <button type='submit'>save</button>
        </form>
      </div>
    </div>
  )
}

export default App
