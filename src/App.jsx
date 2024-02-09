import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route} from 'react-router-dom'
import Articles from './pages/Articles'
import Login from "./pages/Login"
import ArticleById from "./pages/ArticleById"
import Topics from './pages/Topics'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/topics' element={<Topics/>} />
      <Route path='/articles' element={<Articles/>} />
      <Route path='/articles/:topic' element={<Articles/>} />
      <Route path="/articles/article/:articleId" element={<ArticleById/>} />
    </Routes>
  )
}

export default App
