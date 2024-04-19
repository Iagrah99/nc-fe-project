import { useContext } from "react";
import { Col, Card, Button } from "react-bootstrap";
import { UserContext } from '../contexts/UserContext';
import imgStyles from "../css/ImageCSSModule.module.css"
import txtStyles from "../css/TextCSSModule.module.css"

const UserCard = ({user}) => {
  const { loggedInUser, setLoggedInUser} = useContext(UserContext)
  return (
    <Col xl="3" md="6" sm="12" xs="12" key={user.username}>
    <Card style={{minHeight: "35rem", maxHeight: "35rem"}}>
    <figure style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
    <Card.Img src={user.avatar_url} className={imgStyles.userAvatar} />
     </figure>
    <Card.Body>
    <Card.Title className={`${txtStyles.heading} ${txtStyles.userTitle}`}>{user.username}</Card.Title>
    <Card.Text className={txtStyles.userText}>{user.name}</Card.Text>
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