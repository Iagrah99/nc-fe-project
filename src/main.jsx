import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext.jsx';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
)
