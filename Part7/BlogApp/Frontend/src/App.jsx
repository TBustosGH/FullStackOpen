import { useState, useEffect, useRef, } from 'react'
//REACT QUERY
import { useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
//CONTEXT
import NotificationContext from './contexts/NotificationContext.jsx'
//REDUX
import { useDispatch, useSelector } from 'react-redux'
import { clearInfo } from './reducers/userReducer.js'
//SERVICES
import blogService from './services/blogs'
import loginService from './services/login'
//COMPONENTS
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm.jsx'


const App = () => {
  //REACT QUERY
  const queryClient = useQueryClient()
  //REDUX
  const dispatch = useDispatch()
  //Blogs state
  const [blogs, setBlogs] = useState([])
  //User login states
  const [user, setUser] = useState(null)
  //Message states
  const notificationState = useSelector(({notification}) => notification)
  const Message = notificationState
  const { notificationDispatch } = useContext(NotificationContext)

  //Get all notes
  const getAllBlogs = async () => {
    try {
      const updatedBlogs = await blogService.getAll()

      const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes)  //sorts blogs by number of likes
      setBlogs(sortedBlogs)
    } catch (exception) {
      notificationDispatch({
        type: 'SET',
        payload: 'Unable to get blogs from the server'
      })
      setTimeout(() => {
        notificationDispatch({ type: 'ERASE' })
      }, 5000)
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
  const newUser = useSelector((store) => store.user)
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username: newUser.username,
        password: newUser.password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      dispatch(clearInfo())

      notificationDispatch({
        type: 'SET',
        payload: 'Successfully logged in'
      })
      setTimeout(() => {
        notificationDispatch({ type: 'ERASE' })
      }, 5000)
    } catch(exception) {
      console.log(exception)
      notificationDispatch({
        type: 'SET',
        payload: 'Wrong username or password'
      })
      setTimeout(() => {
        notificationDispatch({ type: 'ERASE' })
      }, 5000)
    }
  }
  
  //LOGOUT
  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)

    notificationDispatch({
        type: 'SET',
        payload: 'Successfully logged out'
      })
      setTimeout(() => {
        notificationDispatch({ type: 'ERASE' })
      }, 5000)
  }
  //Blog form
  const blogFormRef = useRef()
  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)

      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)

      notificationDispatch({
        type: 'SET',
        payload: 'Your new blog has been properly posted!'
      })
      setTimeout(() => {
        notificationDispatch({ type: 'ERASE' })
      }, 5000)
      blogFormRef.current.toggleVisibility()
    } catch(exception) {
      notificationDispatch({
        type: 'SET',
        payload: 'There was an error at posting your blog'
      })
      setTimeout(() => {
        notificationDispatch({ type: 'ERASE' })
      }, 5000)

      alert(`Unable to post the blog\nError message: ${exception}`)
    }
  }
  const handleSubmit = (event, blogObject) => {
    event.preventDefault()
    addBlog({
      title: blogObject.title,
      url: blogObject.url || 'No URL provided'
    })
  }
  const blogForm = () => (
    <Togglable buttonLabel='Create a new note' ref={blogFormRef}>
      <BlogForm handleSubmit={handleSubmit}/>
    </Togglable>
  )
  const deleteBlog = async (blog) => {
    const blogId = blog.id
    const confirmMessage = `Remove blog ${blog.title} by ${blog.author.username}?`

    if (window.confirm(confirmMessage)) {
      try{
        await blogService.deleteBlog(blogId)
        notificationDispatch({
        type: 'SET',
        payload: `Removed blog ${blog.title} by ${blog.author.username}`
        })
        setTimeout(() => {
          notificationDispatch({ type: 'ERASE' })
        }, 5000)
        getAllBlogs()
      } catch(exception) {
        notificationDispatch({
          type: 'SET',
          payload: 'There\'s was an error trying to delete the blog'
        })
        setTimeout(() => {
          notificationDispatch({ type: 'ERASE' })
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
        <LoginForm handleSubmit={handleLogin} />
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
        <Blog key={blog.id} blog={blog} author={blog.author.username.toString() === user.username.toString() || false } deleteBlog={deleteBlog} updateLikes={updateLikes}/>   //author checks if the actual user (saved in a state is the author of the blog)
      )}
    </div>
  )
}

export default App