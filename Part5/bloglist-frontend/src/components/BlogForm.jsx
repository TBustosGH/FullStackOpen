import { useState } from 'react'

const BlogForm = ({ handleSubmit }) => {
  const [newBlog, setNewBlog] = useState('')
  const [newUrl, setNewUrl] = useState('')

  return(
    <div>
      <h2>Post a new Blog!</h2>

      <form onSubmit={(event) => {
        handleSubmit(event, newBlog, newUrl)
        setNewBlog('')
        setNewUrl('')
      }}>
        <div>
                    title:
          <input
            type='text'
            value={newBlog}
            placeholder='Your new blog here!'
            onChange={(event) => setNewBlog(event.target.value)}
            required
          />
        </div>
        <div>
                    URL:
          <input
            type='text'
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}


export default BlogForm