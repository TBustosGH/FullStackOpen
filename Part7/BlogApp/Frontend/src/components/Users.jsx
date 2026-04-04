import { useState, useEffect } from 'react'
import { getUsers } from '../services/users'

import {
    TableBody,
    TableContainer,
    Table,
    TableRow,
    TableCell
} from '@mui/material'

const Users = () => {
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
                                    { user.username }
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

export default Users