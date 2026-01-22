import { useState, useEffect, useRef, } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  //Blogs state
  const [blogs, setBlogs] = useState([])
  //User login states
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //Message states
  const [Message , setMessage] = useState(null)

  //Get all notes
  const getAllBlogs = async () => {
    const updatedBlogs = await blogService.getAll()

    if (!updatedBlogs) {
      setMessage('Unable to get blogs from the server')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } else {
      const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes)  //sorts blogs by number of likes
      setBlogs(sortedBlogs)
    }
  }
  useEffect(() => {
    getAllBlogs()
  }, [])
  //Checks if there's a logged user in local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //LOGIN
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setMessage('Successfully logged in')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch(exception) {
      console.log(`an error has ocurred!!!\n${exception}`)
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
          required
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
          required
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  )
  //LOGOUT
  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)

    setMessage('Successfully logged out')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  //Blog form
  const blogFormRef = useRef()
  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)

      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)

      setMessage('Your new blog has been properly posted!')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      blogFormRef.current.toggleVisibility()
    } catch(exception) {
      setMessage('There was an error at posting your blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      alert(`Unable to post the blog\nError message: ${exception}`)
    }
  }
  const blogForm = () => (
    <Togglable buttonLabel='Create a new note' ref={blogFormRef}>
      <BlogForm postBlog={addBlog}/>
    </Togglable>
  )
  const deleteBlog = async (blog) => {
    const blogId = blog.id
    const confirmMessage = `Remove blog ${blog.title} by ${blog.author.username}?`

    if (window.confirm(confirmMessage)) {
      try{
        await blogService.deleteBlog(blogId)
        setMessage(`Removed blog ${blog.title} by ${blog.author.username}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        getAllBlogs()
      } catch(exception) {
        setMessage('There\'s was an error trying to delete the blog')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }
  }
  //Make a put to the backend, adding one like to a post
  const updateLikes = async (blog) => {
    const blogWithUpdatedLikes = {
      title: blog.title,
      author: blog.author.id,
      url: blog.url,
      likes: blog.likes,
      id: blog.id
    }

    const updatedBlog = await blogService.update(blog.id, blogWithUpdatedLikes)
  }

  //Conditional Return
  if(user === null) {
    return (
      <div>
        <h2>Log in to the app to see the blogs</h2>
        <Notification message={Message}/>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={Message}/>

      <p>{user.name} logged-in  <button onClick={handleLogout}>logout</button></p>

      {blogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} author={blog.author.username.toString() === user.username.toString()} deleteBlog={deleteBlog} updateLikes={updateLikes}/>   //author checks if the actual user (saved in a state is the author of the blog)
      )}
    </div>
  )
}

export default App