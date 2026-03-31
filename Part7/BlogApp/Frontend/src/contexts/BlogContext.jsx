import { createContext, useReducer } from 'react'

const initialState = {
    title: '',
    url: ''
}
const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE-TITLE':
            return {
                title: action.payload,
                url: state.url
            }
        case 'UPDATE-URL':
            return {
                title: state.title,
                url: action.payload
            }
        case 'CLEAR-BLOGFORM':
            return {
                title: '',
                url: ''
            }
        default:
            return {
                title: state.title,
                url: state.url
            }
    }
} 

const BlogContext = createContext()

export const BlogContextProvider = (props) => {
    const [blog, blogDispatch] = useReducer(blogReducer)

    return (
        <BlogContext.Provider value={{ blog, blogDispatch }} >
            { props.children }
        </BlogContext.Provider>
    )
}

export default BlogContext