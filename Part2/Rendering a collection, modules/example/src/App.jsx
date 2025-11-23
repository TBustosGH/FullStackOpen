import ShowNotes from "./components/ShowNotes"

const App = ({ notes }) => {
  return(
    <div>
      <h1>Notes</h1>
      <ul>
        {<ShowNotes notes = {notes} />}
      </ul>
    </div>
  )
} 

export default App
