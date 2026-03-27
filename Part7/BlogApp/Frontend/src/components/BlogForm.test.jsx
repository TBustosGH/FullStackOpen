import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { beforeEach, describe, expect, test } from 'vitest'

describe('Test on BlogForm component', () => {
    test('when submitted, blogForm calls its controller', async () => {
        const postBlog = vi.fn()
        const user = userEvent.setup()

        render(<BlogForm handleSubmit={postBlog} />)

        const input = screen.getByPlaceholderText('Your new blog here!')
        const submitButton = screen.getByText('create')

        await user.type(input, 'testing a form...')
        await user.click(submitButton)

        expect(postBlog.mock.calls).toHaveLength(1)
        expect(postBlog.mock.calls[0][1]).toBe('testing a form...')
    })
})