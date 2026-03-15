import { useState } from 'react'

//Personalized hooks
import useCounter from './personalized hooks/useCounter'
import useField from './personalized hooks/useField'


//Using a personalized hook once
const OneSingleCounter = () => {
  const counter = useCounter()

  return (
    <div>
      <div>{counter.value}</div>

      <button onClick={counter.increase}>
        plus
      </button>
      <button onClick={counter.decrease}>
        minus
      </button>
      <button onClick={counter.zero}>
        zero
      </button>
    </div>
  )
}
//Using the same personalized hook twice
const TwoSameCounters = () => {
  const left = useCounter()
  const right = useCounter()

  return (
    <div>
      {left.value}
      <button onClick={left.increase}>
        left
      </button>

      <button onClick={right.increase}>
        right
      </button>
      {right.value}
    </div>
  )
}

const SimpleForm = () => {
  const name = useField('text')
  const born = useField('date')
  const height = useField('number')

  return (
    <div>
      <form>
        name: 
        <input {...name} />
        <br />
        birthdate:
        <input {...born} />
        <br />
        height:
        <input {...height} />
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h2>useCounter</h2>
      <div>
        <h3>USING A SINGLE COUNTER</h3>
        <OneSingleCounter />
      </div>
      <div>
        <h3>USING TWO SAME COUNTER</h3>
        <TwoSameCounters />
      </div>
      <h2>useField</h2>
      <div>
        <SimpleForm />
      </div>
    </div>
  )
}
export default App
