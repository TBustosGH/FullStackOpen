import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, author, deleteBlog }) => {
  const [showAll, setShowAll] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  //Make a put to the backend, adding one like to a post
  const updateLikes = async () => {
    const blogWithUpdatedLikes = {
      title: blog.title,
      author: blog.author.id,
      url: blog.url,
      likes: likes + 1,
      id: blog.id
    }

    const updatedBlog = await blogService.update(blog.id, blogWithUpdatedLikes) 
    
    setLikes(likes + 1)
  }

    if (!showAll) {
    return(
      <div style={blogStyle}>
        <h3>{blog.title}</h3>
        <p>{blog.author.username}</p>

        <button onClick={() => setShowAll(!showAll)}>Show more</button>
      </div>
    )
  } else if (showAll) {
    return(
      <div style={blogStyle}>
        <h3>{blog.title}</h3>
        <p>{blog.author.username}</p>
        <p>Likes: {likes}  <button onClick={updateLikes}>like</button> </p>
        <p>Url: {blog.url}</p>

        <button onClick={() => setShowAll(!showAll)}>Show less</button>
        {author
        ? <button onClick={() => deleteBlog(blog)}>delete</button>
        : null
        }
      </div>
    )
  }
}

export default Blog