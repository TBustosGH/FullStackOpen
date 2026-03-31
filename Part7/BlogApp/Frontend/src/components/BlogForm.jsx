//REACT QUERY
import { useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import BlogContext from '../contexts/BlogContext'

const BlogForm = ({ handleSubmit }) => {
  const queryClient = useQueryClient()
  const { blog, blogDispatch } = useContext(BlogContext)

  const titleFieldValue = blog ? blog.title : ''
  const urlFieldValue = blog ? blog.url : ''
  return(
    <div>
      <h2>Post a new Blog!</h2>

      <form onSubmit={(event) => {
        event.preventDefault()
        handleSubmit(event, blog)
        blogDispatch({ type: 'CLEAR-BLOGFORM' })
      }}>
        <div>
                    title:
          <input
            type='text'
            value={titleFieldValue}
            placeholder='Your new blog here!'
            onChange={(event) => blogDispatch({
              type: 'UPDATE-TITLE',
              payload: event.target.value
            })}
            required
          />
        </div>
        <div>
                    URL:
          <input
            type='text'
            value={urlFieldValue}
            onChange={(event) => blogDispatch({
              type: 'UPDATE-URL',
              payload: event.target.value
            })}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}


export default BlogForm