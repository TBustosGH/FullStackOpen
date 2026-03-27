const Notification = ({ message }) => {
  try {
    if (message === '') {
      return null
    }

    return(
      <div className="statusMessage">
        {message}
      </div>
    )
  } catch(exception) {
    console.log(exception)
  }
}

export default Notification