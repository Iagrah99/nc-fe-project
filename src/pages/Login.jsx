import { useState, useEffect } from "react";
import { fetchUsers } from "../utils/api";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/Navbar";
import UserCard from "../Components/UserCard";
import PageLoading from "../Components/PageLoading";
import Header from "../Components/Header";

const Login = () => {
  document.title = "NC News | Switch User";

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then((users) => {
      setUsers(users);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="min-h-screen bg-slate-950 text-white px-4">
        <main>
        {isLoading ? (
          <PageLoading contentType="Users" />
        ) : (
          <section className="pt-6 px-4 sm:px-6 lg:px-8">
          <Header />
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl text-center font-bold mb-7">Select A User</h1>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {users.map((user) => (
                <UserCard user={user} key={user.username} />
              ))}
            </div>
          </div>
          </section >
        )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Login;
