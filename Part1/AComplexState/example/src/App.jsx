import { useState } from 'react'

const App = () => {
  const [clicks, setClicks] = useState({
    left : 0,
    right : 0
  })
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const Button = ({buttonText, handle}) =>{
    return (
      <button onClick={handle}>
        {buttonText}
      </button>
    )
  }
  const HandleRight = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = clicks.right + 1
    setClicks({...clicks, right : updatedRight})
    setTotal(clicks.left + updatedRight)
  }
  const HandleLeft = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = clicks.left + 1
    setClicks({...clicks, left : updatedLeft})
    setTotal(updatedLeft + clicks.right)
  }
  const History = ({allClicks}) =>{
    if (allClicks.length === 0)
    {
      return (
        <div>
          <p>The app is used by presing the buttons.</p>
        </div>
      )
    }
    return (
      <div>
        <p>Click's history: {allClicks.join(' ')}</p>
      </div>
    )
  }


  return(
    <div>
      {clicks.left}
      <Button buttonText= 'left' handle={HandleLeft} />
      <Button buttonText= 'right' handle={HandleRight} />
      {clicks.right}
      <History allClicks={allClicks} />
      <p>Total clicks: {total}</p>
    </div>
  )
}

export default App
