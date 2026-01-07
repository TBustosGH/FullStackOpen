const Notification = ({ message }) => {
    if (message === null)
        return null

    return(
        <div className="ErrorMessage">
            <br />
            <strong>{message}</strong>
            <br />
        </div>
    )
}

export default Notification