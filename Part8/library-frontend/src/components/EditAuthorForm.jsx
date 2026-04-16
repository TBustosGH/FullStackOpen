import { useState } from 'react'
//QUERIES
import { useMutation } from '@apollo/client/react'
import { EDIT_AUTHOR_BIRTHDAY, ALL_AUTHORS } from '../queries/queries.js'
//COMPONENTS
import Select from 'react-select'

const EditAuthorForm = ({ authors }) => {
    const [born, setBorn] = useState('')
    const [selectedOption, setSelectedOption] = useState(null)  
    //SELECTED AUTHOR OPTION IN SELECT (react-select) 
    let options = [] //AUTHOR OPTIONS TO SELECT (react-select)
    authors.map(a => {
        options = options.concat({ name: a.name, label: a.name })
    })  //FILL OPTIONS WITH THE CURRENT AUTHORS
    

    const [editAuthor] = useMutation(EDIT_AUTHOR_BIRTHDAY, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    })

    const handleSubmit = (event) => {
        event.preventDefault()

        editAuthor({ variables: { name: selectedOption.name, setBornTo: born } })
        setSelectedOption('')
        setBorn('')
    }


    return (
        <div>
            <h3>Set birthyear</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                    />
                </div>
                <div>
                    born
                    <input
                        type='number'
                        name='born'
                        value={born}
                        onChange={({ target }) => setBorn(Number(target.value))}
                    />
                </div>
                <input type='submit' value='update author' />
            </form>
        </div>
    )
}

export default EditAuthorForm