import { useState } from 'react'

const BlogForm = ({ postBlog }) => {
  const [newBlog, setNewBlog] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    postBlog({
      title: newBlog,
      url: newUrl || 'no url provided'
    })

    setNewBlog('')
    setNewUrl('')
  }

  return(
    <div>
      <h2>Post a new note!</h2>

      <form onSubmit={handleSubmit}>
        <div>
                    title:
          <input
            type='text'
            value={newBlog}
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