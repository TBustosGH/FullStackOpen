import {
    AppBar,
    Toolbar,
    Button
} from'@mui/material'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const padding = {
    padding: 5
}
const Nav = styled.div`
    background: BuryWood;
    padding: 1em;
`
export const Navigation = ({ user }) => (
    <Nav>
        <AppBar position='static'>
            <Toolbar>
                <Button color='inherit' component={Link} to='/'>
                    home
                </Button>
                <Button color='inherit' component={Link} to='/notes'>
                    notes
                </Button>
                <Button color='inherit' component={Link} to='/users'>
                    users
                </Button>
                {user
                    ? <em>{user} logged in</em>
                    : <Button color='inherit' component={Link} to='/login'>
                        login
                    </Button>
                }
            </Toolbar>
        </AppBar>
    </Nav>
)