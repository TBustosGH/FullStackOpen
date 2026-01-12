import { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false)

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateLikes = async () => {
    const bLogWithUpdatedLikes = [{ ...blog, likes: blog.likes++ }]
    
    const updatedBlog = await blogService.update(blog.id, bLogWithUpdatedLikes) 
  
    console.log(updatedBlog)
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
        <p>Likes: {blog.likes}  <button onClick={updateLikes}>like</button> </p>
        <p>Url: {blog.url}</p>

        <button onClick={() => setShowAll(!showAll)}>Show less</button>
      </div>
    )
  }
}

export default Blog