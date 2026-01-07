const Blog = ({ blog }) => (
  <div>
    <p>
      <strong>{blog.author.username}</strong> <br/> {blog.title}
    </p>
  </div>  
)

export default Blog