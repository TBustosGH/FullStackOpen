import { render, screen } from '@testing-library/react'
import Note from './Note'
import { expect } from 'vitest'

test('renders content', () => {
    const note = {
        content: 'Component test is done with react-testing-library',
        important: true
    }

    //Exmple 1
    /*
    render(<Note note={note}/>)

    const element = screen.getByText('Component test is done with react-testing-library')
    expect(element).toBeDefined()
    */
    //Example 2
    /*
    const { container } = render(<Note note={note}/>)

    const div = container.querySelector('.note')
    expect(div).toHaveTextContent(
        'Component test is done with react-testing-library'
    )
    */
    //Example 3
    /*
    render(<Note note={note}/>)
    screen.debug()
    */
    //Exmple 4
    render(<Note note={note}/>)
    const element = screen.getAllByText('Component test is done with react-testing-library')

    screen.debug(element)

    expect(element).toBeDefined()
})