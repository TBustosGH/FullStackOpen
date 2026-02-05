import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import noteReducer from './reducers/noteReducer.jsx'
import { createStore } from 'redux'

const store = createStore(noteReducer)

const root = createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()

store.subscribe(renderApp)