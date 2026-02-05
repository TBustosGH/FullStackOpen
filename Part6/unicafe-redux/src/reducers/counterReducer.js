const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const updatedGoodStore = {
        good: state.good + 1,
        ok: state.ok,
        bad: state.bad
      }
      return updatedGoodStore
    case 'OK':
      const updatedOkStore = {
        good: state.good,
        ok: state.ok + 1,
        bad: state.bad
      }
      return updatedOkStore
    case 'BAD':
      const updatedBadStore = {
        good: state.good,
        ok: state.ok,
        bad: state.bad + 1
      }
      return updatedBadStore
    case 'RESET':
      const resetedState = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return resetedState
    default:
      return state
  }
}

export default counterReducer
