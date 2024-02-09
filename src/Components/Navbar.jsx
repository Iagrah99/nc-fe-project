import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import imageStyles from "../css/ImageCSSModule.module.css"
import textStyles from "../css/TextCSSModule.module.css"
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationBar = ({error}) => {
  const navigate = useNavigate();
  
  const { loggedInUser } = useContext(UserContext);
  const handleLink = (e) => {
    e.preventDefault()
    if (e.target.id === "/") {
      navigate("/")
    } else {
      navigate(`/${e.target.id}`)
    }
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky='top'>
      <Container >
        <Navbar.Brand style={{cursor: "pointer"}} onClick={() => navigate("/home")}><span className={textStyles.red}>NC</span> News</Navbar.Brand>
          
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={{marginRight: "20px"}} onClick={handleLink} id='articles'>Articles</Nav.Link>
            <Nav.Link style={{marginRight: "20px"}} onClick={handleLink} id='topics'>Topics</Nav.Link>
            <Nav.Link style={{marginRight: "20px"}} onClick={handleLink} id='login'>Switch User</Nav.Link>
          </Nav>
          <Navbar.Text>
            Logged in as: {loggedInUser.username} <img src={loggedInUser.avatar_url} className={imageStyles.avatar}/>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar