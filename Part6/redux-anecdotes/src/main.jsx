import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'
import store from './store.js'


const root = createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

renderApp()
console.log(store.getState())
store.subscribe(renderApp)
