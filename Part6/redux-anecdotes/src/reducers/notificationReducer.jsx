import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
    name: 'notification',
    initialState: { message: '', timeDelay: 0 },
    reducers: {
        setNotification(state, action) {
            state.message = action.payload.message
            state.timeDelay = action.payload.timeDelay
        },
        eraseNotification(state, action) {
            state.message = ''
            state.timeDelay = 0
        }
    }
})


export const { setNotification, eraseNotification } = notificationSlice.actions
export default notificationSlice.reducer