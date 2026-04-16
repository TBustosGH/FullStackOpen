import { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client/react'
//QUERIES
import { ALL_AUTHORS, EDIT_AUTHOR_BIRTHDAY } from '../queries/queries.js'

const EditAuthorForm = () => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [editAuthor] = useMutation(EDIT_AUTHOR_BIRTHDAY, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    })

    const handleSubmit = (event) => {
        event.preventDefault()

        editAuthor({ variables: { name, setBornTo: born }})
        setName('')
        setBorn('')
    }


    return (
        <div>
            <h3>Set birthyear</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    name
                    <input
                        type='text'
                        name='name'
                        value={name}
                        onChange={({ target }) => setName(target.value)}
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
                <input type='submit' value='update author'/>
            </form>
        </div>
    )
}


const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [authors, setAuthors] = useState([])

  useEffect(() => {
      if (result.data) {
          setAuthors(result.data.allAuthors)
      }
  }, [result])


  if (!props.show) {
      return null
  }

  if (result.loading) {
      return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditAuthorForm />
    </div>
  )
}

export default Authors
