import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import NoteForm from './components/NoteForm'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import { initiliseNotes } from './reducers/noteReducer'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initiliseNotes())
  }, [dispatch])

  return(
    <div>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App
