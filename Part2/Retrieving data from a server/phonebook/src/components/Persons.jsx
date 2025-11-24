const Persons = ({ persons }) => {
    //Show the persons in the list
    return(
        persons.map(person => 
            <li key={person.id}>{`${person.name}\t\t${person.number}`}</li>
        )
    )
}

export default Persons