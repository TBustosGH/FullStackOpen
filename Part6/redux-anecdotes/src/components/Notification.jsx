import { useSelector } from 'react-redux'
import { setNotification, eraseNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }
  const notificationState = useSelector(state => state.notification)
  const dispatch = useDispatch()
  
  if (!notificationState || notificationState.message === '')
    return null

  setTimeout(() => {
    dispatch(eraseNotification())
  }, notificationState.timeDelay * 1000)

  return <div style={style}>
    {notificationState.message}
  </div>
}

export default Notification
