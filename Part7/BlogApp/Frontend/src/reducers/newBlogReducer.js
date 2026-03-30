import { createSlice } from '@reduxjs/toolkit'

const newBlogSlice = createSlice({
    name: 'newBlog',
    initialState: {
        title: '',
        url: ''
    },
    reducers: {
        updateTitle(state, action) {
            return {
                title: action.payload,
                url: state.url
            }
        },
        updateUrl(state, action) {
            return {
                title: state.title,
                url: action.payload
            }
        },
        clearNewBLog(state, action) {
            return {
                title: '',
                url: ''
            }
        }
    }
})

export const { updateTitle, updateUrl, clearNewBLog } = newBlogSlice.actions
export default newBlogSlice.reducer