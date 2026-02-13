import Anecdotes from './components/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <h1>Anecdotes</h1>
      <Filter />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default App
