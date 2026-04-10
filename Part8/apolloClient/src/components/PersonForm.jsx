import React, { useState } from 'react'
import { useMutation } from '@apollo/client/react'

import { CREATE_PERSON, ALL_PERSONS } from '../queries/queries.js'

const PersonForm = ({ setError }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')

    const [createPerson] = useMutation(CREATE_PERSON, {
        refetchQueries: [ { query: ALL_PERSONS }],
        onError: (error) => {
            const errors = error.graphQLErrors[0].extensions.error.errors
            const messages = Object.values(errors).map(e => e.message). join('\n')
            setError(messages)
        }
    })

    const submit = (event) => {
        event.preventDefault()

        createPerson({ variables: { name, phone, street, city } })

        setName('')
        setPhone('')
        setStreet('')
        setCity('')
    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={submit}>
                <div>
                    name <input value={name} 
                        onChange={({ target }) => setName(target.value)}
                        name='name'
                    />
                </div>
                <div>
                    phone <input value={phone} 
                        onChange={({ target }) => setPhone(target.value)}
                        name='phone'
                    />
                </div>
                <div>
                    street <input value={street} 
                        onChange={({ target }) => setStreet(target.value)}
                        name='street'
                    />
                </div>
                <div>
                    city <input value={city}
                        onChange={({ target }) => setCity(target.value)}
                        name='city'
                    />
                </div>
                <button type='submit'>Add!</button>
            </form>
        </div>
    )
}

export default PersonForm