import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

//React Query importations
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './contexts/NotificationContext.jsx'
import { BlogContextProvider } from './contexts/BlogContext.jsx'
import { UserContextProvider } from './contexts/UserContext.jsx'

import App from './App.jsx'

const queryClient = new QueryClient()

const Context = (props) => (
    <UserContextProvider>
        <NotificationContextProvider>
            <BlogContextProvider>
                { props.children }
            </BlogContextProvider>
        </NotificationContextProvider>
    </UserContextProvider>
)

createRoot(document.getElementById('root')).render (
    <StrictMode>
        <Context>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </Context>
    </StrictMode>
)

