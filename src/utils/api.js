import axios from 'axios';

const ncNewsApi = axios.create({
  baseURL: `https://nc-be-project.fly.dev/api`,
});

export const fetchArticles = async (topic, sort_by, order_by, p) => {
  const res = await ncNewsApi.get('/articles', {
    params: { topic, sort_by, order_by, p},
  });
  return { 
    articles: res.data.articles,
    total_count: res.data.total_count,
  };
};

export const fetchArticlesByUsername = async (topic, sort_by, order_by, p, limit, author) => {
  const res = await ncNewsApi.get('/articles', {
    params: { topic, sort_by, order_by, p, limit, author },
  });
  return { 
    articles: res.data.articles,
    total_count: res.data.total_count,
  };
};

export const fetchArticleById = async (articleId = '') => {
  const res = await ncNewsApi.get(`/articles/${articleId}`);
  return res.data.article;
};

export const fetchCommentsByArticleId = async (articleId = '', sort_by) => {
  const res = await ncNewsApi.get(`/articles/${articleId}/comments`, {
    params: { sort_by }
  });
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

export const fetchUserByUsername = async (username) => {
  const res = await ncNewsApi.get(`/users/${username}`);
  return res.data.user
}

export const addComment = async (articleId = '', comment) => {
  const res = await ncNewsApi.post(`/articles/${articleId}/comments`, comment);
  return res.data;
};

export const removeComment = async (commentId = '', comment) => {
  const res = await ncNewsApi.delete(`/comments/${commentId}`, comment);
  return res.data;
};

export const fetchTopics = async () => {
  const res = await ncNewsApi.get(`/topics`);
  return res.data;
};

export const addArticle = async (author, title, topic, body, article_img_url) => {
  const res = await ncNewsApi.post("/articles", author, title, topic, body, article_img_url);
  return res.data;
}

export const removeArticleById = async (articleId) => {
  const res = await ncNewsApi.delete(`/articles/${articleId}`)
  return res.status;
}

export const incrementCommentVotes = async (commentId, voteChange = 1) => {
  const res = await ncNewsApi.patch(`/comments/${commentId}`, {
    inc_votes: voteChange
  })
}

export const decrementCommentVotes = async (commentId, voteChange = 1) => {
  const res = await ncNewsApi.patch(`/comments/${commentId}`, {
    inc_votes: -voteChange
  })
}

export const updateCommentBody = async (commentId, body) => {
  const res = await ncNewsApi.patch(`/comments/${commentId}`, {
    inc_votes: 0,
    body
  });
  return res.data;
}

export const fetchUserComments = async (username, sort_by) => {
  const res = await ncNewsApi.get(`/comments/${username}`, {
    params: {sort_by}
  })
  return res.data
}

export const updateArticleById = async (article_id, title, topic, article_img_url, article_body) => {
  const res = await ncNewsApi.patch(`/articles/${article_id}`, {
   article_img_url, article_body, title, topic, inc_votes: 0
  })
  return res.data.article
}

export const loginUser = async (username, password) => {
  const res = await ncNewsApi.patch(`/auth/login`, {
    user: {
      username,
      password
    }
  })
  return res.data
}

export const logoutUser = async (username) => {
  const res = await ncNewsApi.patch(`/auth/logout`, {
    user: {
      username
    }
  })
  return res.data
}

export const refreshLoginStatus = async (username) => {
  const res = await ncNewsApi.patch(`/users/${username}`, {
    params: {username}
  })

  return res.data
}