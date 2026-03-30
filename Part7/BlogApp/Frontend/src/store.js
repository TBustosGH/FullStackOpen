import { configureStore } from '@reduxjs/toolkit'

import notificationSlice from './reducers/notificationReducer'
import newNoteSlice from './reducers/newBlogReducer'
import userSlice from './reducers/userReducer'

const store = configureStore({
    reducer: {
        notification: notificationSlice,
        newBlog: newNoteSlice,
        user: userSlice
    }
})

export default store