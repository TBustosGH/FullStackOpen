import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    {id : 1, name : 'Arto Hellas', number : '123 213232'},
    {id : 2, name : 'Ada Lovelace', number : '39-44-5323523'},
    {id : 3, name : 'Dan Abramov', number : '12-43-234345'},
    {id : 4, name : 'Mary Poppendieck', number : '39-23-6423122'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const personsToShow = persons.filter(person => person.name.includes(filterName))
  


  return(
    <div>
      <h1>Phonebook</h1>

      <h2>Search</h2>
      <Filter filterName = {filterName} setFilterName = {setFilterName}/>

      <h2>Add a new contact</h2>
      <PersonForm persons = {persons} setPersons={setPersons} newName = {newName} setNewName={setNewName} newNumber = {newNumber} setNewNumber={setNewNumber}/>

      <h2>Numbers</h2>
      <Persons personsToShow = {personsToShow} />
    </div>
  )
}

export default App
