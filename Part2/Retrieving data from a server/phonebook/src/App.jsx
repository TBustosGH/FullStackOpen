import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const ShowPersonsInDB = ({ filterName }) => {
  const [persons, setPersons] = useState([])
  const personsToShow = persons.filter(person => person.name.includes(filterName))

  const hook = () => {
    //console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      //console.log('promise fulfilled')
      setPersons(response.data)
    })
  }

  useEffect(hook, [])
  //console.log('render', persons.length, 'persons')

  return(
    personsToShow.map(person => 
      <li key={person.id}>{person.name}</li>
    )
  )
}

const App = () => {
  const [newPersons, setNewPersons] = useState([])  //To save new persons on a list
  const [newName, setNewName] = useState('')  //To save the current 'new Name' input
  const [newNumber, setNewNumber] = useState('')  //To save the current 'new Number'input
  const [filterName, setFilterName] = useState('')  //To filter names
  const personsToShow = newPersons.filter(person => person.name.includes(filterName))
  
  


  return(
    <div>
      <h1>Phonebook</h1>

      <h2>Search</h2>
      <Filter filterName = {filterName} setFilterName = {setFilterName}/>

      <h2>Add a new contact</h2>
      <PersonForm persons = {newPersons} setPersons={setNewPersons} newName = {newName} setNewName={setNewName} newNumber = {newNumber} setNewNumber={setNewNumber}/>

      <h2>Numbers</h2>
      <ul>
        <ShowPersonsInDB filterName={filterName}/>
        <Persons persons = {personsToShow} />
      </ul>
    </div>
  )
}

export default App

