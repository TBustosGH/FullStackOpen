import { useState } from 'react'

const Button = ({ text, onclick }) => <button onClick={onclick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  ) 
}

const Statistics = ({feedback}) => {
  const all = feedback.good + feedback.neutral + feedback.bad, average = (feedback.good - feedback.bad) / all, positive = (feedback.good / all) * 100

  if (feedback.good > 0 || feedback.neutral > 0 || feedback.bad > 0){
    return(
      <div>
        <table>
          <tbody>
            <StatisticLine text = 'Good' value = {feedback.good} />
            <StatisticLine text = 'Neutral' value = {feedback.neutral} />
            <StatisticLine text = 'bad' value = {feedback.bad} />
            <StatisticLine text = 'Average' value = {average} />
            <StatisticLine text = 'Positive (%)' value = {positive} />
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <p><strong>No feedback provided</strong></p>
    </div>
  )
}

const App = () => {
  const [feedback, setFeedback] = useState({
    good : 0,
    neutral : 0,
    bad : 0,
  })
  const all = feedback.good + feedback.neutral + feedback.bad

  const HandleGood = () => setFeedback({...feedback, good : feedback.good + 1})
  const HandleNeutral = () => setFeedback({...feedback, neutral : feedback.neutral + 1})
  const HandleBad = () => setFeedback({...feedback, bad : feedback.bad + 1})

  return (
   <div>
    <h1>give feedback</h1>
    <Button text = 'Good' onclick = {HandleGood} />
    <Button text = 'Neutral' onclick = {HandleNeutral} />
    <Button text = 'Bad' onclick = {HandleBad} />

    <h2>Statistics</h2>
    <Statistics feedback = {feedback} />
   </div>
  )
}

export default App
