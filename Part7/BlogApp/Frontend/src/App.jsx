import { useState, useEffect, useRef, } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setNotification, eraseNotification } from './reducers/notificationReducer.js'
import { clearInfo } from './reducers/userReducer.js'
import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm.jsx'
import Login from './services/login'

const App = () => {
  const dispatch = useDispatch()
  //Blogs state
  const [blogs, setBlogs] = useState([])
  //User login states
  const [user, setUser] = useState(null)
  //Message states
  const notificationState = useSelector(({notification}) => notification)
  const Message = notificationState

  //Get all notes
  const getAllBlogs = async () => {
    try {
      const updatedBlogs = await blogService.getAll()

      const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes)  //sorts blogs by number of likes
      setBlogs(sortedBlogs)
    } catch (exception) {
      dispatch(setNotification('Unable to get blogs from the server'))

      setTimeout(() => {
        dispatch(eraseNotification())
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

      dispatch(setNotification('Successgully logged in'))
      setTimeout(() => {
        dispatch(eraseNotification())
      }, 5000)
    } catch(exception) {
      console.log(exception)
      dispatch(setNotification('Wrong username of password'))
      setTimeout(() => {
        dispatch(eraseNotification())
      }, 5000)
    }
  }
  
  //LOGOUT
  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)

    dispatch(setNotification('Successfully logged out'))
    setTimeout(() => {
      dispatch(eraseNotification())
    }, 5000)
  }
  //Blog form
  const blogFormRef = useRef()
  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)

      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)

      dispatch(setNotification('Your new blog has been properly posted!'))
      setTimeout(() => {
        dispatch(eraseNotification())
      }, 5000)
      blogFormRef.current.toggleVisibility()
    } catch(exception) {
      dispatch(setNotification('There was an error at posting your blog'))
      setTimeout(() => {
        dispatch(eraseNotification())
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
        dispatch(setNotification(`Removed blog ${blog.title} by ${blog.author.username}`))
        setTimeout(() => {
          dispatch(eraseNotification())
        }, 5000)
        getAllBlogs()
      } catch(exception) {
        dispatch(setNotification('There\'s was an error trying to delete the blog'))
        setTimeout(() => {
          dispatch(eraseNotification())
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