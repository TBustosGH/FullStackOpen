import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Anecdotes from './components/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initialiseAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiseAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <Filter />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default App
