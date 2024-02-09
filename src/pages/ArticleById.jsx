import { Container } from "react-bootstrap"
import Header from "../Components/Header"
import { fetchArticleById } from "../utils/api"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PageLoading from '../Components/PageLoading';
import PageError from "../Components/PageError"
import ArticlePost from "../Components/ArticlePost"
import NavigationBar from "../Components/Navbar"
import Footer from "../Components/Footer"

const ViewArticle = () => {

  const [article, setArticle] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null);
  const { articleId } = useParams()

  document.title = `NC News | ${article.title}`

  useEffect(() => {
    fetchArticleById(articleId).then((article) => {
      setIsError(false)
      setArticle(article)
      setIsLoading(false)
    }).catch((error) => {
      setIsLoading(false)
      setError(error)
      setIsError(true)
    });
  }, [])

  if (isLoading) return <PageLoading/>
  if (isError) return <PageError error={error}/>

  return ( 
    <Container style={{minHeight: "100vh"}} fluid="xl">
    <NavigationBar/>
    <Header/>
    <main>
      <article style={{display: "flex", justifyContent: "center"}}> <ArticlePost article={article} articleId={articleId}/> </article>
   </main>
   <Footer/>
   </Container>
   )
}
 
export default ViewArticle;