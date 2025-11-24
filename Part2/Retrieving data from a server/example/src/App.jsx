import { useState, useEffect } from "react"
import axios from "axios"
import Notes from './components/Notes'

const App = () => {
  const [notes, setNotes] = useState([])

  const hook = () => {
    console.log('effect')
    axios
    .get('http://localhost:3001/foobar')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
  }

  useEffect(hook, [])
  console.log(notes)
  console.log('render', notes.length, 'notes')
  

  return(
    <div>
      <h1>Notes</h1>
      <ul>
        <Notes notes={notes} />
      </ul>
    </div>
  )
}

export default App
