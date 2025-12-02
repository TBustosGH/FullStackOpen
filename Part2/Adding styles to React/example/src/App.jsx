import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  const [errorMessage, setErrorMessage] = useState(null)
  
  //Make a get to notes server
  useEffect(() => {
    noteService
    .GetAll()
    .then(initialNotes => {
      //console.log('promise fulfilled')
      setNotes(initialNotes)
    })
    .catch(error => {
      alert(`Unable to reach the notes\nERROR MESSAGE: ${error}`)
    })
  }, [])
  //Make a post to notes server
  const AddNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content : newNote,
      important : Math.random() < 0.5
    }

    noteService
      .Create(noteObject)
      .then(returnedNote => {
        console.log(returnedNote)
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
      .catch(error => {
      alert(`Unable to add the note\nERROR MESSAGE: ${error}`)
      })
  }

  const HandleNoteChange = (event) => {
    //console.log(event.target.value)
    setNewNote(event.target.value)
  }
  //Make a put to notes server
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important : !note.important }
    
    noteService
    .Update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id? note : returnedNote))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server.`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }


  return(
    <div>
      <div>
        <h1>Notes</h1>
        <Notification message={errorMessage} />
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll? 'important' : 'all'}
        </button>

        <ul>
          {notesToShow.map(note => 
            <Note note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
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
      <Footer />
    </div>
  )
}

export default App
