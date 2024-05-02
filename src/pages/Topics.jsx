import { useState, useEffect } from "react"
import { fetchTopics } from '../utils/api';
import Container from 'react-bootstrap/Container';
import { Row } from "react-bootstrap";
import Footer from '../Components/Footer';
import NavigationBar from "../Components/Navbar";
import PageLoading from "../Components/PageLoading";
import TopicCard from "../Components/TopicCard";
import PageError from "../Components/PageError";
import Main from "../styled_components/StyledMain";
import { H1, H2 } from "../styled_components/StyledHeadings"
import { ArticleCardStyled } from "../styled_components/StyledArticle";

const Topics = () => {
  document.title = 'NC News | Topics';

  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setisError] = useState(false)
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopics().then((topics) => {
      setisError(false)
      setTopics(topics)
      setIsLoading(false)
    }).catch((error) => {
      setisError(true)
      setIsLoading(false)
      setError(error)
    })
  }, []);

  if (isError) return <PageError error={error} />

  return (
    <Container fluid="xs">
      <NavigationBar />
      <Main>
        {isLoading ? (
          <PageLoading contentType="Topics..." />
        ) : (
          <section>
            <H1>Browse Topics</H1>
            <ArticleCardStyled style={{ justifyContent: "center" }}>
              {topics.map((topic) => (
                <TopicCard topic={topic} key={topic.slug} />
              ))}
            </ArticleCardStyled>
          </section>)}
      </Main>
      <Footer />
    </Container>
  )
}

export default Topics