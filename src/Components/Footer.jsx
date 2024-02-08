import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import textStyles from "../css/TextCSSModule.module.css"
import ScrollButton from './BackToTop';

const PageFooter = () => {
  const today = new Date();
  return (
    <footer style={{position: "sticky", bottom: 0}}>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container >
          <Navbar.Brand href="/"><span className={textStyles.red}>NC</span> News</Navbar.Brand>
            <Navbar.Text>Copyright &copy; {today.getFullYear()}</Navbar.Text>
            <ScrollButton/>
        </Container>
      </Navbar>
    </footer>
  );
}

export default PageFooter