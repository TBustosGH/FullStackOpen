import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import store from './Store.jsx'

const root = createRoot(document.getElementById('root'))

const renderApp = () => {
    root.render(<App />)
}
renderApp()

store.subscribe(renderApp)