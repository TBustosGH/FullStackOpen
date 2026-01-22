import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { beforeEach, describe, expect, test } from 'vitest'

describe('Test on BLog component', () => {
    const blog = {
        title: 'testing blog component',
        author: {
            username: 'testUser',
            name: '0'
        },
        likes: 77,
        url: 'URL not provided'
    }

    let container
    const mockHandler = vi.fn()
    beforeEach(() => {
        container = render(
            <Blog blog={blog} author={false} deleteBlog={null} updateLikes={mockHandler}/>
        ).container
    })

    test('renders ONLY title & author by default', () => {
        //First exercise from 5-3
        //Test if title & author are displayed, and likes & 
        //URL are not, by default
        const div = container.querySelector('.blog')
        expect(div).toHaveTextContent(blog.author.username)
        expect(div).toHaveTextContent(blog.title)
        expect(div).not.toHaveTextContent(blog.likes)
        expect(div).not.toHaveTextContent(blog.url)
    })

    test('Clicking "show more" button show likes and URL', async () => {
        const user = userEvent.setup()
        const showMoreButton = container.querySelector('#blogShowMoreButton')
        await user.click(showMoreButton)

        const div = container.querySelector('.blog')
        
        expect(div).toHaveTextContent(blog.url, { exact: false })
        expect(div).toHaveTextContent(blog.likes, { exact: false })
    })

    test('When clicking likes button twice, updateLikes function is called twice', async () => {
        const user = userEvent.setup()
        //Click "show more" button to get to likes button
        const showMoreButton = container.querySelector('#blogShowMoreButton')
        await user.click(showMoreButton)

        //Clikc likes button twice
        const likesButton = screen.getByText('like')
        await user.click(likesButton)
        await user.click(likesButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
        
    })
})
