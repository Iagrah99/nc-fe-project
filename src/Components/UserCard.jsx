import { useContext } from "react";
import { Col, Card, Button } from "react-bootstrap";
import { UserContext } from '../contexts/UserContext';
import imgStyles from "../css/ImageCSSModule.module.css"
import txtStyles from "../css/TextCSSModule.module.css"

const UserCard = ({user}) => {
  const { loggedInUser, setLoggedInUser} = useContext(UserContext)
  return (
    <Col xl="4" md="6" xs="12" key={user.username}>
    <Card style={{ width: '100%', height: "30rem"}}>
    <Card.Img src={user.avatar_url} className={imgStyles.userAvatar} />
    <Card.Body >
    <Card.Title className={txtStyles.heading}>{user.username}</Card.Title>
    </Card.Body>
    {user.username !== loggedInUser.username ?
    <Button variant="primary" id={user.username} style={{fontSize: "1rem"}} onClick={() => {
      setLoggedInUser(user)
    }}>Login</Button> : <Button variant="primary" id={user.username} style={{fontSize: "1rem"}}>Logged In</Button>}
    </Card>
    <div style={{marginBlock: "50px"}}></div>
    </Col>
  )
}

export default UserCard