import { useEffect, useState } from "react";
import { fetchCommentsByArticleId } from "../utils/api";
import CommentCard from "./CommentCard";
import CommentsLoading from "./CommentsLoading";
const ArticleComments = ({
  articleId,
  success,
  searchParams,
  setSearchParams,
}) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setisError] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [isCommentUpdated, setIsCommentUpdated] = useState(false);
  const [sortBy, setSortBy] = useState("sort_by");
  const sortByQuery = searchParams.get("sort_by");

  const handleSortBy = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", e.target.value);
    setSortBy(e.target.value);
    setSearchParams(newParams);
  };

  // Work on implementing comment sorting by newest, most popular.

  useEffect(() => {
    fetchCommentsByArticleId(articleId, sortByQuery)
      .then((comments) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setisError(true);
      });
  }, [success, deleted, isCommentUpdated, sortByQuery]);

  if (isLoading) return <CommentsLoading />;
  if (isError) return <PageError />;

  return (
    <section>
      <form className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 px-4 text-white">
          <p className="text-lg font-semibold">
            {comments.length} Comment{comments.length !== 1 && "s"}
          </p>

          <div className="flex items-center space-x-2">
            <select
              id="sort-comments"
              onChange={handleSortBy}
              className=" text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
              value={sortBy}
            >
              <option className="bg-slate-800" value="created_at">Newest First</option>
              <option className="bg-slate-800" value="votes">Most Popular</option>
            </select>
          </div>

          <div></div>
        </div>
      </form>

      <div>
        {comments.map((comment) => (
          <CommentCard
            comment={comment}
            key={comment.comment_id}
            setDeleted={setDeleted}
            deleted={deleted}
            setIsCommentUpdated={setIsCommentUpdated}
            isCommentUpdated={isCommentUpdated}
          />
        ))}
      </div>
    </section>
  );
};

export default ArticleComments;
