import styled from 'styled-components'
import {
    useNavigate
} from 'react-router-dom'

const Button = styled.button`
    background: Bisque;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid Chocolate;
    border-radius: 3px;
`
const Input = styled.input`
    margin: 0.25em;
`

export const Login = (props) => {
    const navigate = useNavigate()

    const onSubmit = (event) => {
        event.preventDefault()
        props.onLogin('mluukkai')
        navigate('/')
    }

    return (
        <div>
            <h2>login</h2>
            <form onSubmit={onSubmit}>
                <div>
                    username:
                    <Input />
                </div>
                <div>
                    password:
                    <Input type='password' />
                </div>
                <Button type='submit'>login</Button>
            </form>
        </div>
    )
}