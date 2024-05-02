import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import navLinkStyles from "../css/NavLinkCSSModule.module.css"
import ScrollButton from './BackToTop';
import { Link } from 'react-router-dom';
import Footer from "../styled_components/StyledFooter"
import '@fortawesome/fontawesome-free/css/all.css';


const PageFooter = () => {
  return (
    <Footer>
      <Navbar className="bg-body-tertiary">
        <Container className={navLinkStyles.linksContainer}>
          <p></p>
          <Nav>
            <Link className={navLinkStyles.footerLink} to="https://github.com/Iagrah99"><i className="fab fa-github fa-2x"></i></Link>
            <Link className={navLinkStyles.footerLink} to="https://www.linkedin.com/in/ian-graham-357649223/"><i className="fab fa-linkedin fa-2x"></i></Link>
          </Nav>
          <ScrollButton />
        </Container>
      </Navbar>
    </Footer >
  );
}

export default PageFooter