import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './context/AuthContext'
import { ChatContextProvider } from './context/ChatContext'
import { MessagesContextProvider } from './context/MessagesContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <MessagesContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </MessagesContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
)
