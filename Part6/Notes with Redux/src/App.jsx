import store from './store.jsx'

const App = () => {
  console.log('FROM APP', store.getState())
  return(
    <div>
      <ul>
        {store.getState().map(note => 
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
