import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../service/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload

      state.push(content)
    },
    addVote(state, action) {
      const id = action.payload.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { setAnecdotes } = anecdoteSlice.actions

export const initialiseAnecdotes =() => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const { createAnecdote, addVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
