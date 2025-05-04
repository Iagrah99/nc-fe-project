import './index.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import Articles from './pages/Articles'
import ArticleById from "./pages/ArticleById"
import UserById from './pages/UserById';
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
        <Route path='/topics/*' element={<PageError />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/users/:username' element={<UserById />} />
        <Route path='/articles/:topic' element={<Articles />} />
        <Route path='/articles/*' element={<PageError />} />
        <Route path="/articles/article/:articleId" element={<ArticleById />} />
        <Route path="/articles/article/*" element={<PageError />} />
      </Routes>
    </>
  )
}

export default App
