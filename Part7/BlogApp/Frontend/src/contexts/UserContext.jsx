import { createContext, useReducer } from 'react'

const initialState = {
    username: '',
    password: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE-USERNAME':
            return {
                username: action.payload,
                password: state.password
            }
        case 'UPDATE-PASSWORD':
            return {
                username: state.username,
                password: action.payload
            }
        case 'CLEAR-USER':
            return {
                username: '',
                password: ''
            }
        default:
            return {
                username: state.username,
                password: state.password
            }
    }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
    const [user, userDispatch] = useReducer(userReducer)

    return (
        <UserContext.Provider value={{ user, userDispatch }} >
            { props.children }
        </UserContext.Provider>
    )
}

export default UserContext