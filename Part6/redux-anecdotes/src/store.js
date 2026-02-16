import { configureStore } from '@reduxjs/toolkit'

import anecdoteSlice from './reducers/anecdoteReducer'
import filterSlice from './reducers/filterReducer'

const store = configureStore({
    reducer: {
        anecdotes: anecdoteSlice,
        filter: filterSlice
    }
})

export default store