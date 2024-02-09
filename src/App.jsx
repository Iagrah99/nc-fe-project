import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route} from 'react-router-dom'
import Articles from './pages/Articles'
import Login from "./pages/Login"
import ArticleById from "./pages/ArticleById"
import Topics from './pages/Topics'
import PageError from './Components/PageError'
import Home from "./pages/Home"

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/*' element={<PageError/>} />
      <Route path='/login' element={<Login/>} />   
      <Route path='/topics' element={<Topics/>} />
      <Route path='/topics/*' element={<PageError/>} />
      <Route path='/articles' element={<Articles/>} />
      <Route path='/articles/:topic' element={<Articles/>} />
      <Route path='/articles/*' element={<PageError/>} />
      <Route path="/articles/article/:articleId" element={<ArticleById/>} />
      <Route path="/articles/article/*" element={<PageError/>} />
    </Routes>
  )
}

export default App
