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
    const [users, setUsers] = useState([])

    useEffect(() => {
        const get = async () => {
            const request = await getUsers()
            return request
        }
        
        setUsers(get())
    }, [])

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
                        {Object.keys(users).forEach((key) => {
                            <TableRow>
                                <TableCell>
                                    {users[key].username}
                                </TableCell>
                                <TableCell>
                                    {users[key].blogs.length}
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Users