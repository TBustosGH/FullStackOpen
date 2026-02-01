import { createStore } from 'redux'

const noteReducer = (state = [], action) => {
    switch(action.type) {
        case 'NEW_NOTE':
            state.push(action.payload)
            return state
        default:
            return state
    }
}
const store = createStore(noteReducer)

store.dispatch({ 
    type: 'NEW_NOTE',
    payload: {
        content: 'the app state is in redux store',
        important: true,
        id: 1
    }
})
store.dispatch({ 
    type: 'NEW_NOTE',
    payload: {
        content: 'state changes are made with actions',
        important: false,
        id: 2
    }
})

console.log(store.getState())

export default store