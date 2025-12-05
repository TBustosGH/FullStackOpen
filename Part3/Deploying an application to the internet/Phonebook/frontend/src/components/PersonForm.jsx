import backServices from '../services'
import { useEffect } from 'react'

const PersonForm = ({   persons, setPersons, newName, setNewName, newNumber, setNewNumber, setSuccessMessage, setErrorMessage }) => {

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

        //Checks if the person was already added to the list
        if (persons.some((person) => person.name === newName)){
            if(window.confirm(personFoundMessage))  //Asks the user if he wants to change the number of a person in the list
            {
                //Creates a new Person Object With a new number, old id & name
                const foundUser = persons.find(n => n.name === newName)
                const id = foundUser.id
                const personObject = {
                    "id" : id,
                    "name" : newName,
                    "number" : newNumber
                }
                //Updates the information on the server and shows a message to the user
                backServices
                    .Update(id, personObject)
                    .then( () =>{
                        getPersons()
                        getPersons()
                        setNewName('')
                        setNewNumber('')

                        setSuccessMessage(
                            `Changed ${personObject.name}'s number successfully!`
                        )
                        setTimeout(() => {
                            setSuccessMessage(null)
                        }, 5000)
                    })
                    .catch(() => {
                        getPersons()
                        getPersons()
                        setNewName('')
                        setNewNumber('')

                        setErrorMessage(
                            `Unable to change ${personObject.name}'s number.\n${personObject.name}'s information has been deleted from the server.`
                        )
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
            }
            return
        }
        
        //if the person wasn't already added to the list:
        //Create a new personObject with a name and it's number, retrieved from a form
        const personObject = {
            "name" : newName,
            "number" : newNumber
        }

        //Post the personObject to the server & shows a message to the user
        backServices
            .Create(personObject)
            .then(returnedData => {
                setPersons(returnedData)
                setNewName('')
                setNewNumber('')

                setSuccessMessage(
                    `Added ${personObject.name}`
                )
                setTimeout(() => {
                    setSuccessMessage(null)
                }, 5000)
            })  
            .catch(() => {
                setErrorMessage(
                    `Unable to add ${personObject.name} to the list`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
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