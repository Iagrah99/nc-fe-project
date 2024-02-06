import Header from "./Header";
import { Container } from 'react-bootstrap';
import textStyles from "../css/TextCSSModule.module.css"
const PageLoading = () => {
  return ( 
    <Container fluid="xl">
        <div style={{ marginBlock: '15px' }}></div>
        <Header />
        <div style={{ marginBlock: '75px' }}></div>
        <h1 className={textStyles.center}>Loading...</h1>
        <div style={{ marginBlock: '75px' }}></div>
      </Container>
   );
}
 
export default PageLoading;