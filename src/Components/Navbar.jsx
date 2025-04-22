import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Span from "../styled_components/StyledSpan"
import imageStyles from "../css/ImageCSSModule.module.css"
import navLinkStyles from "../css/NavLinkCSSModule.module.css"
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationBar = ({ error }) => {

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
    <Navbar expand="lg" className="bg-body-tertiary " sticky='top' >
      <Container>
        <Navbar.Brand style={{ cursor: "pointer" }} onClick={handleLink} id='home'><Span>NC</Span> News</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-center flex-grow-1">
            <Nav.Link className={navLinkStyles.navLink} onClick={handleLink} id='articles'>Articles</Nav.Link>
            <Nav.Link className={navLinkStyles.navLink} onClick={handleLink} id='login'>Switch User</Nav.Link>
          </Nav>
          <Navbar.Text className={navLinkStyles.currentUser}>
            Logged in as: {loggedInUser.username}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar