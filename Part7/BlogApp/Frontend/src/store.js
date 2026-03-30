import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import newNoteReducer from './reducers/newBlogReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        newBlog: newNoteReducer
    }
})

export default store