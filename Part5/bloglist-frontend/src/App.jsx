import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import login from './services/login'

const App = () => {
  //Blogs state
  const [blogs, setBlogs] = useState([])
  //User login states
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //Blog form states
  const [newBlog, setNewBlog] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  //Get all notes
  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
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
    } catch(exception) {
      console.log(`an error has ocurred!!!\n${exception}`)
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
        />
      </div>
      <div>
        password
        <input
        type='password'
        value={password}
        name='Password'
        onChange={({ target }) => setPassword(target.value)}
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
  }
  //Blog form
  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog,
      author: 'mazimo',
      url: newBlogUrl || 'No url provided'
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      console.log(returnedBlog)

      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setNewBlog('')
      setNewBlogUrl('')
    } catch(exception) {
      alert(`Unable to post the blog\nError message: ${exception}`)
    }
  }
  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
        type='text'
        value={newBlog}
        name='NewBlogName'
        onChange={({ target }) => setNewBlog(target.value)}
        required
        />
      </div>
      <div>
        url:
        <input
        type='text'
        value={newBlogUrl}
        name='NewBlogURL'
        onChange={({ target }) => setNewBlogUrl(target.value)}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )


  //Conditional Return
  if(user === null) {
    return (
      <div>
        <h2>Log in to the app to see the blogs</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged-in  <button onClick={handleLogout}>logout</button></p>

      <h2>create new</h2>
      {blogForm()}

      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
}

export default App