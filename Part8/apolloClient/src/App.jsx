import { useEffect, useState } from 'react'
import { useLazyQuery, useQuery, useApolloClient } from '@apollo/client/react'

//COMPONENTS
import PersonForm from './components/PersonForm.jsx'
import PhoneForm from './components/PhoneForm.jsx'
import LoginForm from './components/LoginForm.jsx'
//QUERIES
import { ALL_PERSONS, FIND_PERSON } from './queries/queries'

const Persons = ({ persons }) => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON)
  const [person, setPerson] = useState(null)

  const showPerson = (name) => {
    getPerson({ variables: { nameToSearch: name } })
  }

  useEffect(() => {
      const updatePerson = ({ result }) => {
        setPerson(result.data.findPerson)
    }
    if (result.data) {
      updatePerson(result)
    }
  }, [result])

  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <div>{person.address.street} {person.address.city}</div>
        <div>{person.phone}</div>
        <button onClick={() => setPerson(null)}>close</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p =>
        <div key={p.name}> 
          {p.name} {p.phone}
          <button onClick={() => showPerson(p.name)} >
            show address
          </button>
        </div>
      )}
    </div>
  )
}


const App = () => {
    const [token, setToken] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const result = useQuery(ALL_PERSONS)
    const client = useApolloClient()

    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 10000)
    }

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    if (result.loading) {
        return <div>loading...</div>
    }
    else if (!token) {
        return (
            <div>
                <Notify errorMessage={errorMessage} />
                <LoginForm setToken={setToken} setError={notify} />
            </div>
        )
    }

    return (
        <div>
            <Notify errorMessage={errorMessage} />
            <button onClick={logout}>logout</button>
            <Persons persons={result.data.allPersons} />
            <PersonForm setError={notify}/>
            <PhoneForm setError={notify}/>
        </div>
    )
    }

const Notify = ({errorMessage}) => {
      if (!errorMessage) {
            return null
      }
      return (
            <div style={{color: 'red'}}>
                {errorMessage}
            </div>
      )
}

export default App