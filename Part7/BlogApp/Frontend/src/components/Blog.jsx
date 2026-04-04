import { useState, useEffect, useRef } from 'react'
import { Link, useMatch } from 'react-router-dom'
import blogService from '../services/blogs'
//REACT QUERY
import { useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
//CONTEXTS
import NotificationContext from '../contexts/NotificationContext'
//Components
import Togglable from './Togglable'
import BlogForm from './BlogForm'


export const Blog = () => {
  const [blog, setBlog] = useState(null)
  let author = ''
  //Messge states
  const { notification, notificationDispatch } = useContext(NotificationContext)

  const match = useMatch('/blogs/:id')
  const blogId = match.params.id
  //Get blog
  useEffect(() => {
    const get = async () => {
      const data = await blogService.getBlogById(blogId)
      setBlog(data)
    }
    get()
  }, [])
  //Edit/delete blog
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
    try {
      const blogWithUpdatedLikes = {
        title: blog.title,
        author: blog.author.id,
        url: blog.url,
        likes: blog.likes + 1,
        id: blog.id
      }
      const updatedBlog = await blogService.update(blog.id, blogWithUpdatedLikes)
      author = blog.author.username
      setBlog(updatedBlog)
    } catch (error) {
      console.log(error)
    }

  }


  if (!blog) {
    return (
      <div>
        <p>Loading blog...</p>
      </div>
    )
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      {blog.url === 'No URL provided' 
        ? <p>{blog.url}</p>  
        : <a href={blog.url}>{blog.url}</a>
      }
      <p>{blog.likes} likes <button onClick={() => updateLikes(blog)}>like</button></p>
      <p>Added by {blog.author.username || author}</p>
    </div>
  )
}

export const Blogs = () => {
  const [blogs, setBlogs] = useState(null)
  //Message states
  const { notification, notificationDispatch } = useContext(NotificationContext)

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
  

  //Get all blogs
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

  if (!blogs) {
    return(
      <div>
        <p>Loading blogs...</p>
      </div>
    )
  }
  return (
    <div>
      {blogForm()}
      <ul>
        {blogs.map(blog => (
          <Link to={`/blogs/${blog.id}`} key={blog.id}>
            <li key={blog.id}>{ blog.title }</li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Blog