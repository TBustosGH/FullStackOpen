const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  )
}
const Total = (props) => {
  return (
    <div>
      <p>Number of exercises: {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of react', exercises1 = 10
  const part2 = 'Using prop to pass data', exercises2 = 7
  const part3 = 'State of a component', exercises3 = 14
  
  return (
    <div>
      <Header course = {course}/>
      <Content part = {part1} exercise = {exercises1} />
      <Content part = {part2} exercise = {exercises2} />
      <Content part = {part3} exercise = {exercises3} />
      <Total exercises1 = {exercises1} exercises2 = {exercises2} exercises3 = {exercises3}/>
    </div>
  )
}

export default App
