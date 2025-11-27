const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber }) => {
    //Add new persons to the list
    const handleNewName = (event) => setNewName(event.target.value)

    const handleNewNumber = (event) => setNewNumber(event.target.value)

    const addPerson = (event) => {
        event.preventDefault()

        if (persons.some(person => person.name === newName))  //Checks if the new person has already been added to the list
        alert(`${newName} has already been added to the list.`)
        else if (persons.some(person => person.number === newNumber))   //Checks if the new number has already been added to the list
        alert(`The number ${newNumber} has already been added to the list.`)
        else {
        const personObject = {
            id : persons.length + 1,
            name : newName,
            number : newNumber
        }
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
        }
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