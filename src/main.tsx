import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginForm from './App.tsx'
import "./main.css"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LoginForm />
  </React.StrictMode>,
)
