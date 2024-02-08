import Header from "./Header";
import { Container } from 'react-bootstrap';
import textStyles from "../css/TextCSSModule.module.css"

const PageError = () => {
  return ( 
    <Container fluid="xl">
      <Header />
      <h1 className={textStyles.center}>Loading...</h1>
      <div style={{ marginBlock: '75px' }}></div>
    </Container>
   );
}
 
export default PageError;