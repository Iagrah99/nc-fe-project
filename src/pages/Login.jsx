import { useState, useEffect } from "react";
import { fetchUsers } from "../utils/api";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/Navbar";
import UserCard from "../Components/UserCard";
import PageLoading from "../Components/PageLoading";
import Main from "../styled_components/StyledMain";
import { H1 } from "../styled_components/StyledHeadings";
import { ArticleCardStyled } from "../styled_components/StyledArticle";

const Login = () => {
  document.title = "NC News | Login";

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then((users) => {
      setUsers(users);
      setIsLoading(false);
    });
  }, []);

  return (
    <Container fluid="xs">
      <NavigationBar />
      <Main>
        {isLoading ? (
          <PageLoading contentType="Users" />
        ) : (
          <Container fluid="xs">
            <H1>Select A User</H1>
            <ArticleCardStyled>
              {users.map((user) => (
                <UserCard user={user} key={user.username} />
              ))}
            </ArticleCardStyled>
          </Container>
        )}
      </Main>
      <Footer />
    </Container>
  );
};

export default Login;
