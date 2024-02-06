import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext.jsx';
import App from './App.jsx';
import { ThemeProvider } from 'react-bootstrap';

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserProvider>
      <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs">
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
)
