import { useState, useEffect } from 'react'
import { getUsers, getUserById } from '../services/users'
import { Link, useMatch } from 'react-router-dom'
import {
    TableBody,
    TableContainer,
    Table,
    TableRow,
    TableCell
} from '@mui/material'

export const User = () => {
    const match = useMatch('/users/:id')
    const id = match.params.id
    const [user, setUser] = useState(null)
    useEffect(() => {
        const get = async () => {
            const data = await getUserById({ id })
            setUser(data)
        }
        get()
    }, [])

    if (!user) {
        return(
            <div>
                <p>Cargando...</p>
            </div>
        )
    }
    return (
        <div>
            <h2>{user.username}</h2>
            <p>{user.name}</p>
            <h4>Added blogs</h4>
            <ul>
                {user.blogs.map(blog => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    )
}

export const Users = () => {
    let users = null
    const [usersState, setUsersState] = useState(null)
    useEffect(() => {
        const get = async () => {
            users = await getUsers()
            setUsersState(users)
        }
        get()
        
    }, [])
    if (!usersState) {
        return (
            <div>
                <h3>No users found!</h3>
            </div>
        )
    }
    return (
        <div>
            <h2>Users</h2>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <h3>Users</h3>
                            </TableCell>
                            <TableCell>
                                <h3>Blogs created</h3>
                            </TableCell>
                        </TableRow>
                        {usersState.map(user => 
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Link to={`/users/${user.id}`}>{ user.username }</Link>
                                </TableCell>
                                <TableCell>
                                    { user.blogs.length }
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

