import { Link } from 'react-router-dom'

//SHOWS ONE SINGLE ANECDOTE
const Anecdote = ({ anecdote }) => {
    return (
        <div>
        <h2>{anecdote.content}</h2>
        <div><strong>Author: </strong>{anecdote.author}</div>
        <div><strong>votes: </strong>{anecdote.votes}</div>
        <div><strong>Source: </strong>{anecdote.info}</div>
        </div>
    )
} 

//SHOWS ALL THE ANECDOTES
const AnecdoteList = ({ anecdotes }) => (
    <div>
        <h2>Anecdotes</h2>
        <ul>
        {anecdotes.map(anecdote => 
            <li key={anecdote.id} >
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </li>
        )}
        </ul>
    </div>
) 

export {
    Anecdote,
    AnecdoteList
}