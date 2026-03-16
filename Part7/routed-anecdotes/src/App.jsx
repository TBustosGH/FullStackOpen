import { useState } from 'react'

import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useMatch
} from 'react-router-dom'

//Components
import CreateNew from './components/CreateNew'
import About from './components/About'
import { Anecdote, AnecdoteList } from './components/Anecdotes'
import Footer from './components/Footer'




//APP component
const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notification, setNotification] = useState('')
  const navigate = useNavigate()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/')

    setNotification(`a new anecdote, ${anecdote.content}, created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }


  const match = useMatch('/anecdotes/:id')
  const anecdote = match 
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const Menu = () => {
    const padding = {
      paddingRight: 5
    }

    return (
      <div>
        <div>
          <Link to='/'>{`anecdotes\t\t`}</Link>
          <Link to='/create'>{`create new\t\t`}</Link>
          <Link to='/about'>{`about\t\t`}</Link>
        </div>

        <div>{notification}</div>

        <Routes>
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes}/>} />  
          <Route path='/create' element={<CreateNew addNew={addNew}/>} />
          <Route path='/about' element={<About />} />
          <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
        </Routes>
      </div>
    )
  }


  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Footer />
    </div>
  )
}

export default App
