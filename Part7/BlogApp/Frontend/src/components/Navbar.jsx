import {
    AppBar,
    Toolbar,
    Button
} from '@mui/material'
import { Link } from 'react-router-dom'

export const Navbar = ({ user, logout }) => (
    <div>
        <AppBar position='static'>
            <Toolbar>
                <Button color='inherit' component={Link} to='/'>
                    Home
                </Button>
                <Button color='inherit' component={Link} to='/users'>
                    Users
                </Button>
                {user
                    ? <div>
                        <em>{user.username} logged in</em> 
                        <button onClick={logout}>logout</button>
                    </div>
                    : <Button color='inherit' component={Link} to='/login'>
                        Login
                    </Button>
                }
            </Toolbar>
        </AppBar>
    </div>
)