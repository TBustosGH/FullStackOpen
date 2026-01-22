import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ 
  blog,
  author,
  deleteBlog,
  updateLikes
}) => {
  const [showAll, setShowAll] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!showAll) {
    return(
      <div style={blogStyle} className='blog'>
        <h3>{blog.title}</h3>
        <p>{blog.author.username}</p>

        <button id='blogShowMoreButton' onClick={() => setShowAll(!showAll)}>Show more</button>
      </div>
    )
  } else if (showAll) {
    return(
      <div style={blogStyle} className='blog'>
        <h3>{blog.title}</h3>
        <p>{blog.author.username}</p>
        <p>Likes: {likes}  <button id='likeButton' onClick={() =>{
          blog.likes += 1
          updateLikes(blog)
          setLikes(likes + 1)
        }}
        >like</button> </p>

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