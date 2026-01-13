const Notification = ({ message }) => {
  try {
    if (message === '') {
      return null
    }

    return(
      <div>
        {message}
      </div>
    )
  } catch(exception) {
    console.log(exception)
  }
}

export default Notification