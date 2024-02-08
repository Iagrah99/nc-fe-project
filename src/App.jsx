import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route} from 'react-router-dom'
import Articles from './pages/Articles'
import Login from "./pages/Login"
import { useState } from 'react'
import ArticleById from "./pages/ArticleById"

function App() {

  const [topics, setTopics] = useState([])

  return (
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/articles' element={<Articles/>} />
      <Route path="/articles/article/:articleId" element={<ArticleById/>}/>
    </Routes>
  )
}

export default App
