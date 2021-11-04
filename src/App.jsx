import React from 'react'
import AppRouter from './components/AppRouter'
import AuthContextProvider from './contexts/AuthContext'
import { db } from "./firebase-config";
function App(props) {
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  )
}

export default App
