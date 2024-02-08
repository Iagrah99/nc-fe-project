import Header from "./Header";
import { Container } from 'react-bootstrap';
import textStyles from "../css/TextCSSModule.module.css"

const PageError = () => {
  return ( 
    <Container fluid="xl">
      <h1 className={textStyles.center}>There was a problem loading the page</h1>
      <h2 className={textStyles.center}>Please try again later!</h2>
      <div style={{ marginBlock: '75px' }}></div>
    </Container>
   );
}
 
export default PageError;