import axios from 'axios';

const ncNewsApi = axios.create({
  baseURL: `https://nc-news-project-imqq.onrender.com/api`,
});

export const fetchArticles = async () => {
  const res = await ncNewsApi.get(`/articles`);
  return res.data.articles;
};

export const fetchArticleById = async (articleId = '') => {
  const res = await ncNewsApi.get(`/articles/${articleId}`);
  return res.data.article;
};

export const fetchCommentsByArticleId = async (articleId = '') => {
  const res = await ncNewsApi.get(`/articles/${articleId}/comments`);
  return res.data;
};

export const incrementArticleVotes = async (articleId = '', voteChange = 1) => {
  return await ncNewsApi.patch(`/articles/${articleId}`, {
    inc_votes: voteChange,
  });
};

export const decrementArticleVotes = async (articleId = '', voteChange = 1) => {
  return await ncNewsApi.patch(`/articles/${articleId}`, {
    inc_votes: -voteChange,
  });
};

export const fetchUsers = async () => {
  const res = await ncNewsApi.get(`/users`);
  return res.data.users;
};

export const addComment = async (articleId = '', comment) => {
  const res = await ncNewsApi.post(`/articles/${articleId}/comments`, comment);
  return res.data;
};
