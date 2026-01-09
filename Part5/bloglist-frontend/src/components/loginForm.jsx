const loginForm = ({ 
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
    }) => {
    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input
                    type='text'
                    value={username}
                    onChange={handleUsernameChange}
                    required
                    />
                </div>
                <div>
                    password
                    <input
                    type='password'
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default loginForm