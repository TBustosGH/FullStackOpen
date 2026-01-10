import { useState } from 'react'

const LoginForm = ({ userLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()

        userLogin({
            username: username,
            password: password
        })

        setUsername('')
        setPassword('')
    }


    return(
        <div>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                    type='text'
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                    />
                </div>
                <div>
                    password
                    <input
                    type='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    />
                </div>
                <button type='submit'>Log in</button>
            </form>
        </div>
    )
}


export default LoginForm