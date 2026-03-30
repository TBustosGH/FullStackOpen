import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        password: ''
    },
    reducers: {
        updateUsername(state, action) {
            return {
                username: action.payload,
                password: state.password
            }
        },
        updatePassword(state, action) {
            return {
                username: state.username,
                password: action.payload
            }
        },
        clearInfo(state, action) {
            return {
                username: '',
                password: ''
            }
        }
    }
})

export const { updateUsername, updatePassword, clearInfo } = userSlice.actions
export default userSlice.reducer