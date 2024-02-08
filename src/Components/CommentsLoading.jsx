import { Container } from 'react-bootstrap';
import textStyles from "../css/TextCSSModule.module.css"
import Spinner from 'react-bootstrap/Spinner';
const CommentsLoading = () => {
  return ( 
    <Container fluid="xl">
        <div className={textStyles.center} style={{ marginBlock: '15px' }}>
        <h2>Loading Comments...</h2>
        <Spinner animation="border" role="status"/>
        </div>
      </Container>
   );
}
 
export default CommentsLoading;