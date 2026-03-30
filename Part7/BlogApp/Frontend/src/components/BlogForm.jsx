import { useDispatch, useSelector } from 'react-redux'
import { updateTitle, updateUrl, clearNewBLog } from '../reducers/newBlogReducer'

const BlogForm = ({ handleSubmit }) => {

  const newBLogObject = useSelector((store) => store.newBlog)
  const dispatch = useDispatch()


  return(
    <div>
      <h2>Post a new Blog!</h2>

      <form onSubmit={(event) => {
        event.preventDefault()
        handleSubmit(event, newBLogObject)
        dispatch(clearNewBLog())
      }}>
        <div>
                    title:
          <input
            type='text'
            value={newBLogObject.title}
            placeholder='Your new blog here!'
            onChange={(event) => dispatch(updateTitle(event.target.value))}
            required
          />
        </div>
        <div>
                    URL:
          <input
            type='text'
            value={newBLogObject.url}
            onChange={(event) => dispatch(updateUrl(event.target.value))}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}


export default BlogForm