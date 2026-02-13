import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const Anecdotes = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if ( filter === '' ) {
            return anecdotes
        }
        return [...anecdotes].filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })

    const sortedAnecdotes = [...anecdotes].toSorted((a, b) => b.votes - a.votes)
    return(
        <div>
            {sortedAnecdotes.map(anecdote =>
                <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() =>
                    dispatch(addVote(anecdote.id))
                }
                />
            )}
        </div>
    )
}

export default Anecdotes