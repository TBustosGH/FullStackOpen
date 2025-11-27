const Persons = ({ personsToShow }) => {
    //Show the persons in the list
    const ShowPersons = ({persons}) => {
        return (
        persons.map(person =>
            <p key={person.id}>{`${person.id}.${person.name}\t\t${person.number}`}</p>
        )
        )
    }

    return(
        <ul>
            <ShowPersons persons={personsToShow} />
        </ul>
    )
}

export default Persons