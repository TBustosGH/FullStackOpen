//React Query
import { useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import UserContext from '../contexts/UserContext'

const LoginForm = ({handleSubmit}) => {
  //const dispatch = useDispatch()
  //const user = useSelector((store) => store.user)
  const { user, userDispatch } = useContext(UserContext)

  const usernameFieldValue = user ? user.username : ''
  const passwordFieldValue = user ? user.password : ''

  return(
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
                    username
          <input
            data-testid='username'
            type='text'
            value={usernameFieldValue}
            onChange={(event) => userDispatch({
              type: 'UPDATE-USERNAME',
              payload: event.target.value
            })}
            required
          />
        </div>
        <div>
                    password
          <input
            data-testid='password'
            type='password'
            value={passwordFieldValue}
            onChange={(event) => userDispatch({
              type: 'UPDATE-PASSWORD',
              payload: event.target.value
            })}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm