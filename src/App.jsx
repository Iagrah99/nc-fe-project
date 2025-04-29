import './index.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import Articles from './pages/Articles'
import Login from "./pages/Login"
import ArticleById from "./pages/ArticleById"
import PageError from './Components/PageError'
import Home from "./pages/Home"

function App() {

  function ScrollToTopOnRouteChange() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <>
      <ScrollToTopOnRouteChange />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/*' element={<PageError />} />
        <Route path='/login' element={<Login />} />
        <Route path='/topics/*' element={<PageError />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/articles/:topic' element={<Articles />} />
        <Route path='/articles/*' element={<PageError />} />
        <Route path="/articles/article/:articleId" element={<ArticleById />} />
        <Route path="/articles/article/*" element={<PageError />} />
      </Routes>
    </>
  )
}

export default App
