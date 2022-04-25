import axios from 'axios';

const COMMENTS_API = 'https://infinite-reef-07217.herokuapp.com/api/comments'

export const findAllComments = async () => {
  const response = await axios.get(COMMENTS_API);
  const comments = response.data;
  return comments;
}

export const findComment = async (comment) => {
  const response = await axios.get(`${COMMENTS_API}/${comment._id}`);
  return response.data;
}

export const createComment = async (comment) => {
  console.log(comment);
  const response = await axios.post(COMMENTS_API, comment)
  return response.data;
}

export const deleteComment = async (comment) => {
  const response = await axios
  .delete(`${COMMENTS_API}/${comment._id}`);
  return response.data;
}

export const updateComment = async (comment) => {
  const response = await axios
  .put(`${COMMENTS_API}/${comment._id}`, comment);
  return response.data;
}