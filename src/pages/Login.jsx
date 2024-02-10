import { useState, useEffect } from "react"
import { fetchUsers } from '../utils/api';
import Container from 'react-bootstrap/Container';
import { Row } from "react-bootstrap";
import Footer from '../Components/Footer';
import NavigationBar from "../Components/Navbar";
import UserCard from "../Components/UserCard";
import PageLoading from "../Components/PageLoading";
import { format } from 'date-fns'

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

  if (isLoading) return <PageLoading/>

  return (
    <Container style={{minHeight: "100vh"}}>
    <NavigationBar />
    <h1 style={{textAlign: "center", marginBlock: "2.5rem"}}>Select A User</h1>
    <main>
      <Row>
        {users.map((user) => (
         <UserCard user={user} key={user.username}/>
        ))}
      </Row>
  </main>
  <Footer/>
</Container>
  )
}

export default Login