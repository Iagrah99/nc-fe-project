import axios from 'axios';

// Base URL

const ncNewsApi = axios.create({
  baseURL: `https://nc-news-project-imqq.onrender.com/api`,
});

// Normal Get Request Endpoints

export const fetchArticles = async () => {
  try {
    return await ncNewsApi.get(`/articles`);
  } catch (err) {
    console.log(err);
  }
};

// Parametric Get Request Endpoints

export const fetchArticleById = (articleId = '') => {
  return ncNewsApi.get(`/articles/${articleId}`);
};

export const fetchCommentsByArticleId = (articleId = '') => {
  return ncNewsApi.get(`/articles/${articleId}/comments`);
};

// Parametric Patch Request Endpoints

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
