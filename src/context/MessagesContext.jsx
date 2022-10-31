import { createContext, useReducer } from 'react'

export const MessagesContext = createContext()

export const MessagesContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    messages: null,
  }

  const messagesReducer = (state, action) => {
    switch (action.type) {
      case 'SET_MESSAGES':
        return {
          messages: action.payload,
        }

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(messagesReducer, INITIAL_STATE)

  return (
    <MessagesContext.Provider value={{ messages: state, dispatch }}>
      {children}
    </MessagesContext.Provider>
  )
}
