import { useState } from 'react' 

const Display = ({ counter }) => <div>{counter}</div>

const Buttons = ({ text, onClick }) => <button onClick={onClick}> {text} </button>

const App = () => {
  let [ counter, setCounter ] = useState(0);
  console.log('rendering with counter value', counter);

  
  const IncreaseByOne = () => {
    setCounter(counter + 1);
    console.log('Increasing, value before', counter);
  }
  const DecreaseByOne = () => {
    console.log('Decreasing, value before', counter);
    setCounter(counter - 1)
  }
  const SetToZero = () => {
    console.log('Reseting to zero, value before', counter);
    setCounter(0);
  }


  return (
    <div>
      <Display counter = {counter} />

      <Buttons text='Plus' onClick={IncreaseByOne} />
      <Buttons text='Minus' onClick={DecreaseByOne} />
      <Buttons text='Zero' onClick={SetToZero} />
    </div>
  )
}
export default App;
