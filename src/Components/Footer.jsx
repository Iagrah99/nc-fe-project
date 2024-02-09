import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import textStyles from "../css/TextCSSModule.module.css"
import ScrollButton from './BackToTop';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';


const PageFooter = () => {
  return (
    <footer style={{position: "sticky", bottom: 0}}>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container >
          <Navbar.Brand href="/"><span className={textStyles.red}>NC</span> News</Navbar.Brand>
            <Link to="https://github.com/Iagrah99"><i className="fab fa-github fa-2x"></i></Link>
            <Link to="https://www.linkedin.com/in/ian-graham-357649223/"><i className="fab fa-linkedin fa-2x"></i></Link>
            <ScrollButton/>
        </Container>
      </Navbar>
    </footer>
  );
}

export default PageFooter