import { useState } from 'react'
//COMPONENTS
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
    const [token, setToken] = useState(null)
    const [page, setPage] = useState('authors')

    /*if (!token) {
        return (
            <div>
                <LoginForm />
            </div>
        )
    }*/

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('add')}>add book</button>
            </div>

            <Authors show={page === 'authors'} />

            <Books show={page === 'books'} />

            <NewBook show={page === 'add'} />
        </div>
    )
}

export default App
