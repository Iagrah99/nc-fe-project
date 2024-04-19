import { useState, useEffect } from "react"
import { fetchUsers } from '../utils/api';
import Container from 'react-bootstrap/Container';
import { Row } from "react-bootstrap";
import Footer from '../Components/Footer';
import NavigationBar from "../Components/Navbar";
import UserCard from "../Components/UserCard";
import PageLoading from "../Components/PageLoading";
import { format } from 'date-fns'
import Main from "../styled_components/StyledMain";

const Login = () => {
  document.title = 'NC News | Login';

  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then((users) => {
      setUsers(users)
      setIsLoading(false)
    })

  }, []);

  if (isLoading) return <PageLoading />

  return (
    <Container fluid="xs">
      <NavigationBar />
      <h1 style={{ textAlign: "center", marginBlock: "2.5rem", fontSize: "3rem" }}>Select A User</h1>
      <Container fluid="xs">
        <Main>
          <Row>
            {users.map((user) => (
              <UserCard user={user} key={user.username} />
            ))}
          </Row>
        </Main>
      </Container>
      <Footer />
    </Container>
  )
}

export default Login