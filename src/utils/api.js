import axios from 'axios';

const ncNewsApi = axios.create({
  baseURL: `https://nc-news-project-imqq.onrender.com/api`,
});

export const fetchArticles = async () => {
  try {
    return await ncNewsApi.get(`/articles`);
  } catch (err) {
    console.log(err);
  }
};

export const fetchArticleById = (articleId = '') => {
  return ncNewsApi.get(`/articles/${articleId}`);
};

export const fetchCommentsByArticleId = (articleId = '') => {
  return ncNewsApi.get(`/articles/${articleId}/comments`);
};

export const incrementArticleVotes = async (articleId = '') => {
  try {
    return await ncNewsApi.patch(`/articles/${articleId}`, {
      inc_votes: 1,
    });
  } catch (err) {
    console.log(err);
  }
};

export const decrementArticleVotes = async (articleId = '') => {
  try {
    return await ncNewsApi.patch(`/articles/${articleId}`, {
      inc_votes: -1,
    });
  } catch (err) {
    console.log(err);
  }
};
