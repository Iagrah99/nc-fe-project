import { Container } from 'react-bootstrap';
import textStyles from "../css/TextCSSModule.module.css"
const CommentsLoading = () => {
  return ( 
    <Container fluid="xl">
        <div style={{ marginBlock: '15px' }}></div>
        <h2 className={textStyles.center}>Loading Comments...</h2>
      </Container>
   );
}
 
export default CommentsLoading;