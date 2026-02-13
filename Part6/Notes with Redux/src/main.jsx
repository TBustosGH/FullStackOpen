import { createRoot } from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import App from './App.jsx'
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

store.subscribe(renderApp)