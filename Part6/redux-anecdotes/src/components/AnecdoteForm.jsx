import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, eraseNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(appendAnecdote(content))
        dispatch(setNotification({ message: 'a new anecdote added properly', timeDelay: 10 }))
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