import store from './Store'

const App = () => {
  const addToCounter = () => store.dispatch({ type: 'INCREMENT' })
  const substractToCounter = () => store.dispatch({ type: 'DECREMENT' })
  const resetCounter = () => store.dispatch({ type: 'ZERO' })

  return(
    <div>
      <p>{store.getState()}</p>

      <div>
        <button onClick={addToCounter}>plus</button>
        <button onClick={substractToCounter}>minus</button>
        <button onClick={resetCounter}>zero</button>
      </div>
    </div>
  )
}
export default App
