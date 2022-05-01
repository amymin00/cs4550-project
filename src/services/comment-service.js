import axios from 'axios';

const API_URI = process.env.REACT_APP_LOCAL_API_URI || process.env.REACT_APP_REMOTE_API_URI;
const COMMENTS_API = `${API_URI}/comments`;

export const findAllComments = async () => {
  const response = await axios.get(COMMENTS_API);
  const comments = response.data;
  return comments;
}

export const findCommentsInIdList = async (listOfId) => {
  const response = await axios.post(`${COMMENTS_API}/post`, {comments: listOfId});
  const comments = response.data;
  return comments;
}

export const findComment = async (comment) => {
  const response = await axios.get(`${COMMENTS_API}/${comment._id}`);
  return response.data;
}

export const createComment = async (comment) => {
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
