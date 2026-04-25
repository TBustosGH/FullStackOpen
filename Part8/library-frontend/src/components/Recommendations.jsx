import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, ME } from '../queries/queries'


const Recommendations = ({ show }) => {
    //USER DATA
    const userData = useQuery(ME)
    const [favouriteGenre, setFavouriteGenre] = useState(null)
    //GET BOOKS
    const [books, setBooks] = useState([])
    const result = useQuery(ALL_BOOKS)
    const filteredBooks = books.filter(book => book.genres.includes(favouriteGenre))
    
    useEffect(() => {
        if (result.data) {
            setBooks(result.data.allBooks)  //eslint-disable-line
        }
        if (userData.data && userData.data.me) {
            setFavouriteGenre(userData.data.me.favouriteGenre)
        }
    }, [result, userData])

    //RETURN
    if (!show) {
        return null
    } else if (result.loading) {
        return <div>loading...</div>
    }
    return (
        <div>
            <h2>Recommendations</h2>
            {filteredBooks.length === 0
            ? <div>Seems like we don't have any recommendations for you...</div>
            : <table>
                <tbody>
                    <tr>
                        <th>title</th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {filteredBooks.map((a) => (
                        <tr key={a.id}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            }
        </div>
    )
}

export default Recommendations