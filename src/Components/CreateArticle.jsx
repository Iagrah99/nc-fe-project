import { useState, useContext } from 'react';
import { Form, Button } from "react-bootstrap";
import { CustomForm } from "../styled_components/StyledForm"
import { H2 } from '../styled_components/StyledHeadings';
import { UserContext } from "../contexts/UserContext";
import { addArticle } from '../utils/api';

function CreateArticle({ setSuccess }) {
  const [articlePosting, setArticlePosting] = useState(false);
  const [articlePosted, setArticlePosted] = useState(false);
  const [articlePostingError, setArticlePostingError] = useState(false);
  const [articleIsOnlySpaces, setArticleIsOnlySpaces] = useState(false);
  const [articleTitle, setarticleTitle] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [articleTopic, setArticleTopic] = useState("");
  const [articleImgUrl, setArticleImgUrl] = useState("");

  const { loggedInUser } = useContext(UserContext);

  const addNewArticle = (postedArticle, e) => {
    addArticle(postedArticle).then((articleFromApi) => {
      e.target[2].disabled = false
      setArticlePosted(true)
      setArticlePosting(false)
      setArticleIsOnlySpaces(false);
      setArticleBody("")
      setSuccess(articleFromApi.article_id)

    }).catch((error) => {
      setArticlePosted(false)
      setArticlePostingError(true)
    })
  };

  const handleTopic = (e) => {
    const selectedTopic = e.target.value
    console.log(selectedTopic)
    setArticleTopic(selectedTopic)
  };

  const handleSubmitPost = (e) => {
    e.preventDefault()

    e.target[5].disabled = true
    setArticlePosting(true)

    const trimmedArticle = articleBody.trim();
    if (!trimmedArticle) {
      setArticleIsOnlySpaces(true);
      return;
    } else {
      const newArticle = {
        author: loggedInUser.username,
        title: articleTitle,
        topic: articleTopic,
        body: articleBody,
        article_img_url: articleImgUrl
      }
      console.log(newArticle)
      addNewArticle(newArticle, e)
    }
  }

  return (
    <>
      <H2>Post An Article</H2>
      <CustomForm onSubmit={handleSubmitPost}>
        <div className="mb-3" style={{ width: "100%" }}>
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" value={loggedInUser.username} disabled />
        </div>
        <div className="mb-3" style={{ width: "100%" }}>
          <Form.Label>Article Title:</Form.Label>
          <Form.Control type="text" placeholder={`${loggedInUser.username}'s article`} required onChange={(e) => {
            const titleValue = e.target.value;
            setarticleTitle(titleValue)
          }} />
        </div>
        <Form.Group controlId="TopicGroup" className="mb-3" style={{ width: "100%" }}>
          <Form.Label>Article Topic:</Form.Label>
          <Form.Select
            aria-label="select-category" onChange={handleTopic}
          >
            <option value="cooking" id="cooking">
              Cooking
            </option>
            <option value="coding" id="coding">
              Coding
            </option>
            <option value="football" id="football">
              Football
            </option>
          </Form.Select>
        </Form.Group>
        <div className="mb-3" style={{ width: "100%" }}>
          <Form.Label>Article Body:</Form.Label>
          <Form.Control as="textarea" rows={10} placeholder="What would you like to talk about?" maxLength={3000} value={articleBody} required onChange={(e) => {
            const bodyValue = e.target.value;
            setArticleBody(bodyValue);

            bodyValue.trim().length === 0;

            const containsOnlySpaces = /^\s+$/.test(bodyValue);
            setArticleIsOnlySpaces(containsOnlySpaces);

            const disableButton = containsOnlySpaces || bodyValue.trim().length === 0;
            e.target.form[5].disabled = disableButton;

            setArticlePosted(false);
          }} />
          {articleIsOnlySpaces && articleBody.length > 0 ? <p style={{ marginBlock: "15px", color: "red" }}>Can't only use spaces!</p> : null}
        </div>
        <div className="mb-3" style={{ width: "100%" }}>
          <Form.Label>Article Image URL (optional):</Form.Label>
          <Form.Control type="text" placeholder={`Your image link`} className="mb-3" value={articleImgUrl} onChange={(e) => {
            const imgUrlValue = e.target.value;
            setArticleImgUrl(imgUrlValue);
          }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "flex-start", alignItems: "flex-start", marginInline: "5px" }}>
          <Button type="submit" variant="danger" className="mb-5">Post Article</Button>
          {articlePosted ? <p style={{ marginBlock: "15px", color: "green" }}>Posted Successfully!</p> : null}
          {articlePosting & !articlePostingError ? <p style={{ marginBlock: "15px" }}>Posting Your Article...</p> : null}
          {articlePostingError ? <p style={{ marginBlock: "15px", color: "red" }}>Couldn't post article, try again later.</p> : null}
        </div>
      </CustomForm>
    </>
  )
}

export default CreateArticle
