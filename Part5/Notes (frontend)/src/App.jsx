import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services'
import Notification from './components/Notification'
import Footer from './components/Footer'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'

const App = () => {
  //Notes states
  const [notes, setNotes] = useState([])  //Where all notes are saved
  const [newNote, setNewNote] = useState('')  //Contains the new note
  const [showAll, setShowAll] = useState(true)  //Used as a boolean filter
  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  //Message state
  const [errorMessage, setErrorMessage] = useState(null) 
  //Login states
  const [showLogin, setShowLogin] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
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
  //Checks if there's a logged user in local storage
  //if there is, it'll logged the user in again
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])
  //Make a post to notes server
  const AddNote = async (event) => {
    event.preventDefault()
    const noteObject = {
      content : newNote,
      important : Math.random() < 0.5
    }

    try {
      const returnedNote = await noteService.Create(noteObject)
      console.log(returnedNote)
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    } catch (exception) {
      alert(`Unable to add the note\nError message: ${exception}`)
    }
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
  //Login
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setShowLogin(false)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)


  return(
    <div>
      <div>
        <h1>Notes</h1>
        <Notification message={errorMessage} />
        
        

        {user === null
        ? <div>
            <p>You must log in to post a new note</p>
            <Togglable buttonLabel='Log in'>
              <LoginForm 
              handleSubmit={handleLogin}
              handleUsernameChange={handleUsernameChange}
              handlePasswordChange={handlePasswordChange}
              username={username}
              password={password}
              />
            </Togglable>
          </div>
        : <div>
            <p>{user.name} logged-in</p>
            <Togglable buttonLabel='New note'>
              <NoteForm
              handleSubmit={AddNote}
              newNote={newNote}
              handleNoteChange={HandleNoteChange}
              />
            </Togglable>
          </div>
        }

        <button onClick={() => setShowAll(!showAll)}>
          show {showAll? 'important' : 'all'}
        </button>

        <ul>
          {notesToShow.map(note => 
            <Note note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
          )}
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default App
