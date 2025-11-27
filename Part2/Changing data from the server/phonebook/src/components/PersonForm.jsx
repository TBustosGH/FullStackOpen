import backServices from '../services'
import { useEffect } from 'react'

const PersonForm = ({   persons, setPersons, newName, setNewName, newNumber, setNewNumber }) => {

    //Add new persons to the list
    const handleNewName = (event) => setNewName(event.target.value)
    const handleNewNumber = (event) => setNewNumber(event.target.value)


    const getPersons = () => {
            backServices
                .GetAll()
                .then(response => {
                    setPersons(response)
                })
        }
        useEffect(getPersons, [])


    const addPerson = (event) => {
        event.preventDefault()
        const personFoundMessage = `${newName} has already been added to the list.\nDo you want to replace that contact?`

        if (persons.some((person) => person.name === newName)){
            if(window.confirm(personFoundMessage))
            {
                const foundUser = persons.find(n => n.name === newName)
                const id = foundUser.id
                const personObject = {
                    "id" : id,
                    "name" : newName,
                    "number" : newNumber
                }
                
                backServices
                    .Update(id, personObject)
                    .then( () =>{
                        getPersons()
                        getPersons()
                        setNewName('')
                        setNewNumber('')
                    })
                    
            }
            return
        }
        

        const personObject = {
            "name" : newName,
            "number" : newNumber
        }

        backServices
            .Create(personObject)
            .then(returnedData => {
                setPersons(persons.concat(returnedData))
                setNewName('')
                setNewNumber('')
            })  
    }
    

    return(
        <div>
            <form>
                <div>
                name : <input value={newName} onChange={handleNewName}/>
                </div>
                <div>
                number : <input value={newNumber} onChange={handleNewNumber}/>
                </div>
                <div>
                <button type='submit' onClick={addPerson}>Add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm