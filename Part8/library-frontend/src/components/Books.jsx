import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client/react'
//COMPONENTS
import { ALL_BOOKS } from '../queries/queries.js'

const Books = (props) => {
    if (!props.show) {
        return null
    }

    const [books, setBooks] = useState([])
    const result = useQuery(ALL_BOOKS)

    useEffect(() => {
        if (result.data) {
            setBooks(result.data.allBooks)
        }
    }, [result])
  

  if (result.loading) {
    return <div>loading...</div>
  }
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
