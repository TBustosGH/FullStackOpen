import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, updateUsername, clearInfo } from '../reducers/userReducer'

const LoginForm = ({handleSubmit}) => {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user)

  return(
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
                    username
          <input
            data-testid='username'
            type='text'
            value={user.username}
            onChange={(event) => dispatch(updateUsername(event.target.value))}
            required
          />
        </div>
        <div>
                    password
          <input
            data-testid='password'
            type='password'
            value={user.password}
            onChange={(event) => dispatch(updatePassword(event.target.value))}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm