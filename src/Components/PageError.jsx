import NavigationBar from "./Navbar";
import Footer from "./Footer";
import { useNavigate, useLocation } from "react-router-dom";

const PageError = ({ error }) => {
  const location = useLocation();
  const currentUrl = location.pathname;
  const navigate = useNavigate();

  const ErrorCard = ({ title, message, buttonLabel, onClick }) => (
    <div className="min-h-screen flex flex-col bg-slate-950 ">
      <NavigationBar />
      <main className="flex-grow flex items-center justify-center px-4 pt-12">
        <div className="bg-slate-950 text-center p-8 rounded-lg shadow-md max-w-xl w-full border border-slate-300 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-red-600 mb-4">{title}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>
          {buttonLabel && (
            <button
              onClick={onClick}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition"
            >
              {buttonLabel}
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );

  if (!error && currentUrl.includes("/") && !currentUrl.includes("topic")) {
    return (
      <ErrorCard
        title="Error 404: Page Not Found"
        message="Uh oh! Looks like that page doesn't exist... Try using the navigation bar!"
      />
    );
  }

  if (!error && currentUrl.includes("topic") || error?.response?.data?.msg === "Topic not found") {
    return (
      <ErrorCard
        title="Error 404: Topic Not Found"
        message="Uh oh! That topic doesn't exist. Let's find some that do!"
        buttonLabel="Browse Topics"
        onClick={() => navigate("/topics")}
      />
    );
  }

  if (error?.response?.data?.msg === "Not found") {
    return (
      <ErrorCard
        title="Error 404: Article Not Found"
        message="Uh oh! That article doesn't exist. Let's find some that do!"
        buttonLabel="Browse Articles"
        onClick={() => navigate("/articles")}
      />
    );
  }

  if (error?.response?.data?.msg === "Invalid sort by query") {
    return (
      <ErrorCard
        title="Error 400: Invalid Sort-by Query"
        message="Uh oh! Looks like you used an invalid sort-by option."
        buttonLabel="Browse Articles"
        onClick={() => navigate("/articles")}
      />
    );
  }

  if (error?.response?.data?.msg === "Invalid order by query") {
    return (
      <ErrorCard
        title="Error 400: Invalid Order-by Query"
        message="Uh oh! Looks like you used an invalid order-by option."
        buttonLabel="Browse Articles"
        onClick={() => navigate("/articles")}
      />
    );
  }

  return null; // fallback
};

export default PageError;
