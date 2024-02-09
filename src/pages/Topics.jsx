import { useState, useEffect } from "react"
import { fetchTopics } from '../utils/api';
import Container from 'react-bootstrap/Container';
import { Row } from "react-bootstrap";
import Footer from '../Components/Footer';
import NavigationBar from "../Components/Navbar";
import PageLoading from "../Components/PageLoading";
import TopicCard from "../Components/TopicCard";
import PageError from "../Components/PageError";

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
    })
  }, []); 

  if (isLoading) return <PageLoading/>
  if (isError) return <PageError error={error}/>

    return (
      <Container style={{minHeight: "100vh"}}>
      <NavigationBar />
      <h1 style={{textAlign: "center", marginBlock: "5rem"}}>Browse Topics</h1>
      <main>
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