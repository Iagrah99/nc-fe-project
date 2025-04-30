import { useState } from "react";
import ArticleComments from "./ArticleComments";
import CreateComment from "./CreateComment";

const CommentSection = ({articleId, searchParams, setSearchParams}) => {
  const [success, setSuccess] = useState(null)

  return ( 
    <section>
      <CreateComment articleId={articleId} setSuccess={setSuccess}/>
      <ArticleComments articleId={articleId} success={success} searchParams={searchParams} setSearchParams={setSearchParams}/>
    </section>
   );
}
 
export default CommentSection;