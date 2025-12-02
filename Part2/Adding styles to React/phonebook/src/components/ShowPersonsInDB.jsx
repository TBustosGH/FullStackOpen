import backServices from '../services'
import { useState, useEffect } from "react"

const ShowPersonsInDB = ({ persons, setPersons, filterName }) => {
    const personsToShow = persons.filter(person => person.name.includes(filterName))


    const getPersons = () => {
        backServices
            .GetAll()
            .then(response => {
                setPersons(response)
            })
    }
    useEffect(getPersons, [])

    const handleDelete = (id) => {
        const message = 'Are tou sure you want to delete this element from the list'
        if(window.confirm(message))
        {
            backServices
                .Remove(id)
        }
        else    return
        getPersons()
        getPersons()
    }
    //console.log('render', persons.length, 'persons')

    return(
        personsToShow.map(person => 
        <li key={person.id}>{`${person.name}  ${person.number}`}<button onClick={() => handleDelete(person.id)}>Delete</button></li>
        )
    )
}

export default ShowPersonsInDB