/*const Hello = (props) => {
  console.log(props);
  return(
    <div>
      <p>Hello {props.name}, you're {props.age} years old</p>
    </div>
  )
}

const App = () =>{
  const name = 'Peter', age = 10;
  return(
    <div>
      <h1>Greetings!</h1>
      <Hello name='George' age='34'/>
      <Hello name={name} age={age}/>
    </div>
  )
}*/

const App = () => {
  const friends = [
    {name : 'Peter', age : 4},
    {name : 'Maya' , age : 10}
  ]

  return (
    <div>
      <p>{friends[0].name} {friends[0].age}</p>
      <p>{friends[1].name} {friends[1].age}</p>
    </div>
  )
}

export default App
