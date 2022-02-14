import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://nc-be-news-api.herokuapp.com/api',
});

export const getArticles = (topic, sort_by, order) => {
  return newsApi
    .get('/articles', {
      params: {
        topic: topic,
        sort_by: sort_by,
        order: order,
      },
    })
    .then((res) => {
      return res;
    });
};

export const getTopics = async () => {
  const { data } = await newsApi.get('/topics');
  return data;
};

export const getArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`).then((res) => {
    return res;
  });
};

export const getCommentsByArticleId = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res;
  });
};

export const patchArticleById = (article_id, incObj) => {
  return newsApi.patch(`/articles/${article_id}`, incObj).then((res) => {
    return res;
  });
};

export const patchComment = (comment_id, incObj) => {
  return newsApi.patch(`/comments/${comment_id}`, incObj).then((res) => {
    return res;
  });
};

export const deleteComment = (comment_id) => {
  return newsApi.delete(`/comments/${comment_id}`);
};

export const postComment = (article_id, incObj) => {
  return newsApi
    .post(`/articles/${article_id}/comments`, incObj)
    .then((res) => {
      return res;
    });
};
