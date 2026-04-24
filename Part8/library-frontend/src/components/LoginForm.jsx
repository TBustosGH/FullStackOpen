import { useState } from 'react'

const LoginForm = ({ setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = ({ event }) => {
        event.preventDefault()

        setUsername('')
        setPassword('')
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
                <button type='submit'>Login!</button>
            </form>
        </div>
    )
}

export default LoginForm