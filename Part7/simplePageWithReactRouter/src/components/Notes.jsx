import { Link } from 'react-router-dom'
import {
    TableBody, 
    TableContainer, 
    Table, 
    TableRow, 
    TableCell 
} from '@mui/material'

export const Note = ({ note }) => {
    return (
        <div>
        <h2>{note.content}</h2>
        <div>{note.user}</div>
        <div><strong>{note.important ? 'important' : ''}</strong></div>
        </div>
    )
}

export const Notes = ({ notes }) => (
    <div>
        <h2>Notes</h2>
        
        <TableContainer >
            <Table>
                <TableBody>
                {notes.map(note => (
                    <TableRow key={note.id}>
                    <TableCell>
                        <Link to={`/notes/${note.id}`}>{note.content}</Link>
                    </TableCell>
                    <TableCell>
                        {note.user}
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
)