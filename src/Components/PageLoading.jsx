import { Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { H1 } from "../styled_components/StyledHeadings"
import { LoadingDiv } from "../styled_components/StyledLoading"

const PageLoading = ({contentType}) => {
  return ( 
    <Container>
      <LoadingDiv>
      <H1>Loading {contentType}</H1>
      <Spinner animation="border" role="status"/>
      </LoadingDiv>
    </Container>
   );
}
 
export default PageLoading;