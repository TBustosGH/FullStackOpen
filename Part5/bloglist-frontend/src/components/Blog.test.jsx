import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'

test('renders ONLY title & author by default', () => {
    const blog = {
        title: 'testing blog component',
        author: {
            username: 'testUser',
            name: '0'
        },
        likes: 77,
        url: 'URL not provided'
    }

    //First exercise from 5-3
    //Test if title & author are displayed, and likes & 
    //URL are not, by default
    console.log('Render Screen:')
    const { container } = render(<Blog blog={blog} author={false} deleteBlog={null} />)
    screen.debug()
    
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(blog.author.username)
    expect(div).toHaveTextContent(blog.title)
    expect(div).not.toHaveTextContent(blog.likes)
    expect(div).not.toHaveTextContent(blog.url)
})