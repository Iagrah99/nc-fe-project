import { Container, Button, Card } from 'react-bootstrap';
import NavigationBar from "./Navbar";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const PageError = ({error}) => {

  const location = useLocation();
  const currentUrl = location.pathname;

  const navigate = useNavigate()

  if (!error && currentUrl.includes("/") && !currentUrl.includes("topic")) {
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

  if (!error && currentUrl.includes("topic") || error.response.data.msg === "Topic not found") {
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
  }

  else if (error.response.data.msg === "Not found") {
    return ( 
      <Container style={{minHeight: "100vh"}}>
        <NavigationBar/>
        <Card style={{marginTop: "3rem"}}>
          <Card.Header style={{textAlign: "center"}}>
           <Card.Title>Error 404: Article Not Found</Card.Title>
           <Card.Text>Uh oh! Looks like that article doesn't Exist... Let's Find Some That Do!</Card.Text>
            <Button variant='success' onClick={() => navigate("/articles")}>Browse Articles</Button>
        </Card.Header>
        </Card>
      </Container>
     );
  }

  else if (error.response.data.msg === "Invalid sort by query") {
    return ( 
      <Container style={{minHeight: "100vh"}}>
        <NavigationBar/>
        <Card style={{marginTop: "3rem"}}>
          <Card.Header style={{textAlign: "center"}}>
           <Card.Title>Error 400: Invalid Sort-by Query</Card.Title>
           <Card.Text>Uh Oh! Looks like you used an invalid sort-by option! </Card.Text>
            <Button variant='success' onClick={() => navigate("/articles")}>Browse Articles</Button>
        </Card.Header>
        </Card>
      </Container>
     );
  }

  else if (error.response.data.msg === "Invalid order by query") {
    return ( 
      <Container style={{minHeight: "100vh"}}>
        <NavigationBar/>
        <Card style={{marginTop: "3rem"}}>
          <Card.Header style={{textAlign: "center"}}>
           <Card.Title>Error 400: Invalid Order-by Query</Card.Title>
           <Card.Text>Uh Oh! Looks like you used an invalid order-by option! </Card.Text>
            <Button variant='success' onClick={() => navigate("/articles")}>Browse Articles</Button>
        </Card.Header>
        </Card>
      </Container>
     );
  }
  
 
}
 
export default PageError;