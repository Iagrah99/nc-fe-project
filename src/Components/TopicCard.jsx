import { Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CardDiv } from "../styled_components/StyledCardDiv";

const TopicCard = ({ topic }) => {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/articles/${topic.slug}`)
  }

  return (
    <Col xl="3" md="6" sm="12" xs="12">
      <CardDiv>
        <Card style={{ width: '100%', height: "30rem" }}>
          <Card.Img src={`http://tiny.cc/${topic.slug}1234`} style={{ minHeight: "20rem", maxHeight: "20rem" }} />
          <Card.Body >
            <Card.Title style={{ textAlign: "center" }}>{topic.slug}</Card.Title>
            <Card.Text style={{ textAlign: "center" }}>{topic.description}</Card.Text>
          </Card.Body>
          <Button variant="primary" onClick={handleClick} style={{ fontSize: "1rem" }}>View {topic.slug} Articles</Button>
        </Card>
      </CardDiv>
      <div style={{ marginBlock: "50px" }}></div>
    </Col>
  )
}

export default TopicCard