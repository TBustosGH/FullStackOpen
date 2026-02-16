import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, eraseNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification('a new anecdote added properly'))
        setTimeout(() => {
            dispatch(eraseNotification())
        }, 5000)
    }
    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <input name='anecdote' required/>
                <button type='submit' >create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm