import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => setVisible(!visible)
    const hideWhenVisible = { display: visible ? 'None' : '' }
    const ShowWhenVisible = { display: visible ? '' : 'None'}

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return(
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={ShowWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
})

export default Togglable