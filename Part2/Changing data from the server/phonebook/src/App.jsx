import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import ShowPersonsInDB from './components/ShowPersonsInDB'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newPersons, setNewPersons] = useState([])  //To save new persons on a list
  const [newName, setNewName] = useState('')  //To save the current 'new Name' input
  const [newNumber, setNewNumber] = useState('')  //To save the current 'new Number'input
  const [filterName, setFilterName] = useState('')  //To filter names
  
  


  return(
    <div>
      <h1>Phonebook</h1>

      <h2>Search</h2>
      <Filter filterName = {filterName} setFilterName = {setFilterName}/>

      <h2>Add a new contact</h2>
      <PersonForm persons={persons} setPersons={setPersons} newName = {newName} setNewName={setNewName} newNumber = {newNumber} setNewNumber={setNewNumber}/>

      <h2>Numbers</h2>
      <ol>
        <ShowPersonsInDB persons={persons} setPersons={setPersons} filterName={filterName}/>
      </ol>
    </div>
  )
}

export default App

