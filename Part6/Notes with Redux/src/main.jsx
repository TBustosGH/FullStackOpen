import { createRoot } from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import App from './App.jsx'
import noteReducer, { createNote } from './reducers/noteReducer.jsx'
import filterReducer, { filterChange } from './reducers/filterReducer.jsx'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(reducer)

const root = createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(
  <Provider store={store}>
    <App />
  </Provider>
  )
}


renderApp()

store.subscribe(renderApp)