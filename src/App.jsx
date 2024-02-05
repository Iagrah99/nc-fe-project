import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Articles from './pages/Articles';
import { useState } from 'react';

function App() {

  const [topics, setTopics] = useState([])

  return (
    <Routes>
      <Route path='/' element={<Articles/>}/>
    </Routes>
  )
}

export default App
