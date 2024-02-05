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