import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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
        <Table striped>
        <tbody>
            {notes.map(note => 
            <tr key={note.id}>
                <td>
                <Link to={`/notes/${note.id}`}>
                    {note.content}
                </Link>
                </td>
                <td>
                {note.user}
                </td>
            </tr>
            )}
        </tbody>
        </Table>
    </div>
)