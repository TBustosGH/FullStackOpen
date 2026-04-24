import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client/react'
//QUERIES
import { ALL_AUTHORS } from '../queries/queries.js'

import EditAuthorForm from './EditAuthorForm.jsx'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [authors, setAuthors] = useState([])

  useEffect(() => {
      if (result.data) {
          setAuthors(result.data.allAuthors)    //eslint-disable-line
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

          {props.token
              ? <EditAuthorForm authors={authors} />
              : null
          }
          
    </div>
  )
}

export default Authors
