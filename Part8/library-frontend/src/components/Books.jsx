import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client/react'
//COMPONENTS
import { ALL_BOOKS, FIND_BOOKS_BY_GENRE } from '../queries/queries.js'

const Books = (props) => {
  //BOOKS
    const [books, setBooks] = useState([])    //Store all books
    const [selectedGenre, setSelectedGenre] = useState([])  //Storage the genres filter for FIND_BOOK_BY_GENRE query 
    const result = useQuery(FIND_BOOKS_BY_GENRE, {
        variables: { genres: selectedGenre }
    })    //Get all books from DB with a filter
  //FILTER
    const [genres, setGenres] = useState([])    //Store all current books' (saved in books state) genres

  useEffect(() => {
      if (result.data) {
          setBooks(result.data.allBooks)    //eslint-disable-line
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
      setSelectedGenre(genre)   //Set filter
      result.refetch()  //Refetch all books with queries
  }
  const handleResetFilter = () => {
    setSelectedGenre([])    //Reset filters
    result.refetch()    //Refetch all books with no filter
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
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {selectedGenre.length === 0
        ? <div>
            {genres.map(genre =>
                <button key={genre} onClick={() => handleChangeFilter(genre)}>{genre}</button>
            )}
        </div>
        : <button onClick={handleResetFilter}>reset filter</button>
        }
      </div>
    </div>
  )
}

export default Books
