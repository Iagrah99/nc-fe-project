import { useState, useEffect } from "react"
import { fetchTopics } from '../utils/api';
import Container from 'react-bootstrap/Container';
import { Row } from "react-bootstrap";
import Footer from '../Components/Footer';
import NavigationBar from "../Components/Navbar";
import PageLoading from "../Components/PageLoading";
import TopicCard from "../Components/TopicCard";
import PageError from "../Components/PageError";
import styles from "../css/TextCSSModule.module.css"

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

  if (isLoading) return <PageLoading/>
  if (isError) return <PageError error={error}/>

    return (
      <Container>
      <NavigationBar />
      <main style={{minHeight: "100vh"}}>
      <h1 className={styles.heading}>Browse Topics</h1>
        <Row>
          {topics.map((topic) => (
           <TopicCard topic={topic} key={topic.slug}/>
          ))}
        </Row>
    </main>
    <Footer/>
  </Container>
    )
}

export default Topics