import { Container } from 'react-bootstrap';
import textStyles from "../css/TextCSSModule.module.css"
import Spinner from 'react-bootstrap/Spinner';
const PageLoading = ({contentType}) => {
  return ( 
    <Container >
      <div style={{ marginBlock: '150px' }} className={textStyles.center}>
      <h1 style={{ marginBlock: '15px' }}>Loading {contentType}.</h1>
      <Spinner animation="border" role="status"/>
      </div>
    </Container>
   );
}
 
export default PageLoading;