import { useField } from '../hooks/index'

//RENDERS A FORM TO ADD A NEW ANECDOTE
const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
        })
    }


    return (
        <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
            <div>
            content
            <input name='content' {...content} required/>
            </div>
            <div>
            author
            <input name='author' {...author} required/>
            </div>
            <div>
            url for more info
            <input name='info' {...info} required/>
            </div>
            
            <input type='submit' value='create'/>
            <input type='reset' value='reset'/>
        </form>
        </div>
    )
} 

export default CreateNew