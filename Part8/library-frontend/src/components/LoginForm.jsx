import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client/react'
import { LOGIN } from '../queries/queries'

const LoginForm = ({ show, setToken, setPage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
        }
    }, [result.data]) //eslint-disable-line

    const submit = async (event) => {
        event.preventDefault()
        
        await login({ variables: { username, password } })

        setUsername('')
        setPassword('')
        setPage('authors')
    }

    if (!show) {
        return null
    }

    return (
        <div>
            <h2>Login Form</h2>

            <form onSubmit={submit}>
                <div>
                    username: <input
                        type='text'
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        placeholder='username'
                        required
                    />
                </div>
                <div>
                    password: <input
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        placeholder='password'
                        required
                    />
                </div>
                <input type='submit' value='login' />
            </form>
        </div>
    )
}

export default LoginForm