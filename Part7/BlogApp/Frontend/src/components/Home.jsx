import { useState, useEffect, useRef } from 'react'

//SERVICES
import blogService from '../services/blogs'
//Components
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'


const Home = ({ user }) => {
    const [blogs, setBlogs] = useState([])
    
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


    return (
        <div>
            {blogForm()}
        
            {blogs.map(blog =>
                <Blog 
                    key={blog.id} 
                    blog={blog} 
                    author={
                        blog.author.username.toString() === user.username.toString() || false
                    } //author checks if the actual user (saved in a state is the author of the blog)
                    deleteBlog={deleteBlog} 
                    updateLikes={updateLikes}
                />   
            )}
        </div>
    )
}

export default Home