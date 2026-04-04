//REACT QUERY
import { useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
//CONTEXTS
import NotificationContext from '../contexts/NotificationContext'





const Home = ({ user }) => {
    const queryClient = useQueryClient()
    //Message states
    const { notification, notificationDispatch } = useContext(NotificationContext)


    return (
        <div>
            <h2>Nothing here, everything has been moved to thier routes. Perhaps it`s bad idea, cuz I have nothing left to put in here</h2>

            <Link to='/blogs'>Blogs</Link>
            <Link to='/users'>Users</Link>
        </div>
    )
}

export default Home