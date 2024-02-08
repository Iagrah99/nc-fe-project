import { useContext } from "react";
import { Row, Col, Card, Button} from "react-bootstrap";
import { UserContext } from '../contexts/UserContext';

const UserCard = ({user}) => {
  const { loggedInUser, setLoggedInUser} = useContext(UserContext)
  return (
    <Col xl="4" md="6" xs="12" key={user.username}>
    <Card style={{ width: '100%', height: "30rem"}}>
    <Card.Img src={user.avatar_url} style={{minHeight: "20rem", maxHeight: "20rem"}} />
    <Card.Body >
    <Card.Title>{user.username}</Card.Title>
    </Card.Body>
    {user.username !== loggedInUser.username ?
    <Button variant="primary" id={user.username} onClick={() => {
      setLoggedInUser(user)
    }}>Login</Button> : <Button variant="primary" id={user.username}>Logged In</Button>}
    </Card>
    <div style={{marginBlock: "50px"}}></div>
    </Col>
  )
}

export default UserCard