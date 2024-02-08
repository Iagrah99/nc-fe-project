import { useState } from "react";
import ArticleComments from "./ArticleComments";
import CreateComment from "./CreateComment";

const CommentSection = ({articleId}) => {
  const [success, setSuccess] = useState(false)

  return ( 
    <section>
      <CreateComment articleId={articleId} setSuccess={setSuccess}/>
      <ArticleComments articleId={articleId} success={success}/>
    </section>
   );
}
 
export default CommentSection;