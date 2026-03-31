import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
//Redux importations
import { Provider } from 'react-redux'
import store from './store.js'
//React Query importations
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './contexts/NotificationContext.jsx'
import { BlogContextProvider } from './contexts/BlogContext.jsx'

import App from './App.jsx'

const queryClient = new QueryClient()


const root = createRoot(document.getElementById('root'))
const renderApp = () => {
    root.render(
        <StrictMode>
            <NotificationContextProvider>
                <BlogContextProvider>
                    <QueryClientProvider client={queryClient} >
                        <Provider store={store}>
                            <App />
                        </Provider>
                    </QueryClientProvider>
                </BlogContextProvider>
            </NotificationContextProvider>
        </StrictMode>
        
    )
}

renderApp()

store.subscribe(renderApp)