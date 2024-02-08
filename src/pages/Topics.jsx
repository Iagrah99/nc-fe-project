import { useState, useEffect } from "react"
import { fetchTopics } from '../utils/api';
import Container from 'react-bootstrap/Container';
import { Row } from "react-bootstrap";
import Footer from '../Components/Footer';
import NavigationBar from "../Components/Navbar";
import PageLoading from "../Components/PageLoading";
import TopicCard from "../Components/TopicCard";

const Topics = () => {
  document.title = 'NC News | Topics';
  
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTopics().then((topics) => {
      setTopics(topics)
      setIsLoading(false)
    })
    
  }, []); 

  if (isLoading) return <PageLoading/>

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