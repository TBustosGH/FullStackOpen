import { useSelector } from 'react-redux'
import { setNotification, eraseNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }
  const notificationState = useSelector(state => state.notification)


  if (!notificationState || notificationState === '')
    return null

  return <div style={style}>
    {notificationState}
  </div>
}

export default Notification
