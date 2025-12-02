const SuccessNotification = ({ message }) => {
    const notificationStyle = {
        color : 'green',
        fontStyle : 'italic',
        fontSize : 20,
        background : 'lightgrey',
        borderStyle : 'solid',
        borderColor : 'green',
        borderRadius : 5,
        padding : 10,
        marginBottom : 10
    }

    if (message === null) 
        return null

    return(
        <div style={notificationStyle}>
            <em />
            {message}
        </div>
    )
}
const ErrorNotification = ({ message }) => {
    const notificationStyle = {
        color : 'red',
        fontStyle : 'italic',
        fontSize : 20,
        background : 'lightgrey',
        borderStyle : 'solid',
        borderColor : 'red',
        borderRadius : 5,
        padding : 10,
        marginBottom : 10
    }

    if (message === null)
        return null

    return(
        <div style={notificationStyle}>
            <em />
            {message}
        </div>
    )
}

export { SuccessNotification, ErrorNotification }