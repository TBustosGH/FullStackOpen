import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client/react'
//COMPONENTS
import { ALL_BOOKS } from '../queries/queries.js'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const result = useQuery(ALL_BOOKS)
  //FILTER
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(books)

  useEffect(() => {
      if (result.data) {
          setBooks(result.data.allBooks)    //eslint-disable-line
          setSelectedGenre(books)
          let bookGenres = Array()
          //Some shitty code to filter the genres
          books.map(b =>
              b.genres.map(g => 
                  bookGenres.includes(g)
                      ? null
                      : bookGenres.push(g)
              )
          )
          setGenres(bookGenres)   
      }
  }, [result, books])

  //HANDLE CLICK ON BUTTONS
  const handleChangeFilter = (genre) => {
    setSelectedGenre(books.filter(book => book.genres.includes(genre)))
  }
  const handleResetFilter = () => {
    setSelectedGenre(books)
  }
  //DON'T SHOW PAGE IF SHOW IS FALSE
  if (!props.show) {
      return null
  }
  //DISPLAY A LOADING TEXT
  if (result.loading) {
    return <div>loading...</div>
  }
  //DISPLAY A TABLE WITH THE INFORMATION OF THE BOOKS
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
          {selectedGenre.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres
        ? <div>
            {genres.map(genre =>
                <button key={genre} onClick={() => handleChangeFilter(genre)}>{genre}</button>
            )}
            <button onClick={handleResetFilter}>reset filter</button>
        </div>
        : null
        }
      </div>
    </div>
  )
}

export default Books
