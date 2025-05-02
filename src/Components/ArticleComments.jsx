import { useEffect, useState } from "react";
import { fetchCommentsByArticleId } from "../utils/api";
import CommentCard from "./CommentCard";

const ArticleComments = ({
  articleId,
  success,
  searchParams,
  setSearchParams,
}) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSorting, setIsSorting] = useState(false);
  const [isError, setisError] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [isCommentUpdated, setIsCommentUpdated] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [sortBy, setSortBy] = useState("sort_by");
  const sortByQuery = searchParams.get("sort_by");

  const handleSortBy = (e) => {
    setIsSorting(true);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", e.target.value);
    setSortBy(e.target.value);
    setSearchParams(newParams);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchCommentsByArticleId(articleId, sortByQuery)
      .then((comments) => {
        setComments(comments);
        setIsLoading(false);
        setIsSorting(false);
        setHasLoadedOnce(true);
      })
      .catch(() => {
        setIsLoading(false);
        setIsSorting(false);
        setisError(true);
      });
  }, [success, deleted, isCommentUpdated, sortByQuery]);

  if (isError) return <PageError />;

  return (
    <section>
      {/* Controls */}
      <form className="mb-8">
        <div className="flex flex-wrap items-center justify-center max-w-fit gap-8 px-4 py-3 text-white">
          <div className="flex items-center gap-3 py-2 px-4 rounded-lg shadow-md text-base">
            <i className="fa-regular fa-comments text-white text-base"></i>
            <span>
              {comments.length} Comment{comments.length !== 1 && "s"}
            </span>
          </div>

          <div className="flex items-center gap-1 px-4 rounded-lg shadow-md">
            <i className="fa-solid fa-sliders text-slate-300 text-sm"></i>
            <select
              id="sort-comments"
              onChange={handleSortBy}
              className="text-white px-3 text-base py-2 focus:outline-none cursor-pointer bg-slate-800"
              defaultValue={sortBy}
            >
              <option value="sort_by" disabled>
                Sort By
              </option>
              <option value="votes">Most Popular</option>
              <option value="created_at">Newest First</option>
            </select>
          </div>
        </div>
      </form>
      <div>
        {/* Spinner Overlay */}
        {isLoading && !isSorting && !hasLoadedOnce && (
          <div className="relative w-full flex flex-col items-center justify-center px-4 py-12 rounded-lg overflow-hidden">
            {/* Semi-transparent backdrop */}
            <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>

            {/* Foreground loading content */}
            <div className="relative flex flex-col items-center gap-5 z-10">
              <h1 className="text-2xl text-white text-center">
                Loading Comments
              </h1>
              <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            </div>
          </div>
        )}

        {/* Comments List */}
        <div className={`${isLoading ? "opacity-50" : ""}`}>
          {comments.map((comment) => (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              setDeleted={setDeleted}
              deleted={deleted}
              setIsCommentUpdated={setIsCommentUpdated}
              isCommentUpdated={isCommentUpdated}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleComments;
