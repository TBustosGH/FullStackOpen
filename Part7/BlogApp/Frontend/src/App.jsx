import { useState, useEffect } from 'react'

import { useContext } from 'react'
//CONTEXT
import NotificationContext from './contexts/NotificationContext.jsx'
import UserContext from './contexts/UserContext.jsx'
//SERVICES
import blogService from './services/blogs'
import loginService from './services/login'
//VIEWS
import {
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from 'react-router-dom'
//COMPONENTS
import Notification from './components/Notification'
import LoginForm from './components/LoginForm.jsx'
import { Users, User } from './components/Users.jsx'
import { Blog, Blogs } from './components/Blog.jsx'
import { Navbar } from './components/Navbar.jsx'


const App = () => {
  //VIEWS
  const navigate = useNavigate()
  //User login states
  const [user, setUser] = useState(null)
  const { userDispatch } = useContext(UserContext)
  //Message states
  const { notification, notificationDispatch } = useContext(NotificationContext)

  
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
  const newUser = useContext(UserContext)
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username: newUser.user.username,
        password: newUser.user.password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      userDispatch({ type: 'CLEAR-USER' })
      navigate('/')
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
  

  //Conditional Return
  if(user === null) {
    return (
      <div>
        <h2>Log in to the app to see the blogs</h2>
        <Notification message={notification}/>
        <LoginForm handleSubmit={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Navbar user={user} logout={handleLogout} />
      <Notification message={notification}/>
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/users' element={user ? <Users /> : <Navigate replace to='/login' />} />
        <Route path='/users/:id' element={user ? <User /> : <Navigate replace to='/login' />} />
        <Route path='/login' element={<LoginForm handleSubmit={handleLogin} />} />
        <Route path='/blogs/:id' element={<Blog />} />
      </Routes>

      
    </div>
  )
}

export default App