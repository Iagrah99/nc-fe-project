import { Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { fetchCommentsByArticleId } from '../utils/api';
import CommentCard from './CommentCard';

import CommentsLoading from './CommentsLoading';

const ArticleComments = ({ articleId, success }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setisError] = useState(false);
  const [deleted, setDeleted] = useState(null)

  useEffect(() => {
    fetchCommentsByArticleId(articleId)
      .then((comments) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setisError(true);
      });
  }, [success, deleted]);

  if (isLoading) return <CommentsLoading />;
  if (isError) return <PageError />;

  return (
    <section>
      <Row>
        {comments.map((comment) => (
          <CommentCard comment={comment} key={comment.comment_id} setDeleted={setDeleted}/>
        ))}
      </Row>
    </section>
  );
  
};

export default ArticleComments;
