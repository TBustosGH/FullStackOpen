import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'

const Notification = ({ message }) => {
  const { notification } = useContext(NotificationContext)

  if (notification === null) return null

  return (
    <div>
      { notification }
    </div>
  )
}

export default Notification