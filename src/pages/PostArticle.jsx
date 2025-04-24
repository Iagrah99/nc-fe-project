import NavigationBar from "../Components/Navbar";
import Footer from "../Components/Footer";
import CreateArticle from "../Components/CreateArticle";
import Header from "../Components/Header";

const PostArticle = () => {
  document.title = "NC News | Post Article";

  return (
    <>
      <NavigationBar />
      <main className="flex-1 min-h-screen bg-slate-950">
        <section className="pt-6 px-4 sm:px-6 lg:px-8">
          <Header />

          <div>
            <article id="post-article">
              <CreateArticle />
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PostArticle;
