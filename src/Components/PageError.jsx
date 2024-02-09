import { Container, Button, Card } from 'react-bootstrap';
import NavigationBar from "./Navbar";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const PageError = ({error}) => {

  const [errorMsg, setErrorMsg] = useState("")

  const location = useLocation();
  const currentUrl = location.pathname;

  if (error) {
    setErrorMsg(error.response.data.msg)
  }

  const navigate = useNavigate()

  if (errorMsg === "Topic not found" || !error && currentUrl.includes("topic")) {
    return ( 
      <Container style={{minHeight: "100vh"}}>
        <NavigationBar/>
        <Card style={{marginTop: "3rem"}}>
          <Card.Header style={{textAlign: "center"}}>
           <Card.Title>Error 404: Topic Not Found</Card.Title>
           <Card.Text>Uh oh! Looks like that topic doesn't Exist... Let's Find Some That Do!</Card.Text>
            <Button variant='success' onClick={() => navigate("/topics")}>Browse Topics</Button>
        </Card.Header>
        </Card>
      </Container>
     );
  } else {
    return ( 
      <Container style={{minHeight: "100vh"}}>
        <NavigationBar/>
        <Card style={{marginTop: "3rem"}}>
          <Card.Header style={{textAlign: "center"}}>
           <Card.Title>Error 404: Page Not Found</Card.Title>
           <Card.Text>Uh oh! Looks like that page doesn't Exist... Try using the navigation bar!</Card.Text>
        </Card.Header>
        </Card>
      </Container>
     );
  }
}
 
export default PageError;